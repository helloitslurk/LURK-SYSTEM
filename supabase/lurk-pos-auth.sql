-- LURK POS authentication and private app_storage access
-- Replace the PIN placeholder below with your own 6-10 digit PIN before running.
-- Run this AFTER deploying the matching App.jsx change.

create extension if not exists pgcrypto;

create table if not exists public.lurk_pos_auth_config (
  singleton boolean primary key default true check (singleton),
  pin_hash text not null
);

insert into public.lurk_pos_auth_config(singleton, pin_hash)
values (true, crypt('REPLACE_WITH_YOUR_PRIVATE_PIN', gen_salt('bf', 12)))
on conflict (singleton) do nothing;

create table if not exists public.lurk_pos_sessions (
  id bigint generated always as identity primary key,
  token_hash text not null unique,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);

alter table public.lurk_pos_auth_config enable row level security;
alter table public.lurk_pos_sessions enable row level security;
revoke all on public.lurk_pos_auth_config from public, anon, authenticated;
revoke all on public.lurk_pos_sessions from public, anon, authenticated;

create or replace function public.lurk_pos_login(p_pin text)
returns text
language plpgsql
security definer
set search_path = pg_catalog, public, extensions
as $$
declare
  v_token text;
begin
  if p_pin is null or length(p_pin) < 6 or length(p_pin) > 32 then
    return null;
  end if;
  if not exists (
    select 1 from public.lurk_pos_auth_config c
    where c.singleton = true and c.pin_hash = crypt(p_pin, c.pin_hash)
  ) then
    return null;
  end if;
  v_token := encode(gen_random_bytes(32), 'hex');
  insert into public.lurk_pos_sessions(token_hash, expires_at)
  values (encode(digest(v_token, 'sha256'), 'hex'), now() + interval '12 hours');
  return v_token;
end;
$$;

create or replace function public.lurk_pos_session_valid(p_session_token text)
returns boolean
language sql
security definer
set search_path = pg_catalog, public, extensions
as $$
  select exists (
    select 1 from public.lurk_pos_sessions s
    where s.token_hash = encode(digest(coalesce(p_session_token, ''), 'sha256'), 'hex')
      and s.expires_at > now()
  );
$$;

create or replace function public.lurk_pos_storage_get(p_session_token text, p_key text)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public, extensions
as $$
declare v_value jsonb;
begin
  if not public.lurk_pos_session_valid(p_session_token) then
    raise exception 'Oturum süresi doldu. Yeniden giriş yap.';
  end if;
  if p_key not in ('lurk_t','lurk_o','lurk_l','lurk_m','lurk_d','lurk_customers','lurk_credit','lurk_plus_members') then
    raise exception 'Geçersiz veri anahtarı';
  end if;
  select value into v_value from public.app_storage where key = p_key;
  return v_value;
end;
$$;

create or replace function public.lurk_pos_storage_set(p_session_token text, p_key text, p_value jsonb)
returns boolean
language plpgsql
security definer
set search_path = pg_catalog, public, extensions
as $$
begin
  if not public.lurk_pos_session_valid(p_session_token) then
    raise exception 'Oturum süresi doldu. Yeniden giriş yap.';
  end if;
  if p_key not in ('lurk_t','lurk_o','lurk_l','lurk_m','lurk_d','lurk_customers','lurk_credit','lurk_plus_members') then
    raise exception 'Geçersiz veri anahtarı';
  end if;
  insert into public.app_storage(key, value, updated_at)
  values (p_key, p_value, now())
  on conflict (key) do update set value = excluded.value, updated_at = now();
  return true;
end;
$$;

-- Remove the permissive policy and direct table access.
drop policy if exists "allow all" on public.app_storage;
drop policy if exists "Allow all" on public.app_storage;
drop policy if exists "allow_all" on public.app_storage;
do $$
declare p record;
begin
  for p in
    select policyname from pg_policies
    where schemaname = 'public' and tablename = 'app_storage'
  loop
    execute format('drop policy if exists %I on public.app_storage', p.policyname);
  end loop;
end;
$$;

alter table public.app_storage enable row level security;
revoke all on public.app_storage from public, anon, authenticated;

revoke all on function public.lurk_pos_login(text) from public, anon, authenticated;
revoke all on function public.lurk_pos_session_valid(text) from public, anon, authenticated;
revoke all on function public.lurk_pos_storage_get(text,text) from public, anon, authenticated;
revoke all on function public.lurk_pos_storage_set(text,text,jsonb) from public, anon, authenticated;

grant execute on function public.lurk_pos_login(text) to anon, authenticated;
grant execute on function public.lurk_pos_session_valid(text) to anon, authenticated;
grant execute on function public.lurk_pos_storage_get(text,text) to anon, authenticated;
grant execute on function public.lurk_pos_storage_set(text,text,jsonb) to anon, authenticated;

-- Keep the existing LURK+ customer portal RPC callable without exposing app_storage.
grant execute on function public.lurk_plus_member_by_token(text) to anon, authenticated;
