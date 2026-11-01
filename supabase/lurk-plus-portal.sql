-- LURK+ customer portal: run once in Supabase SQL Editor.
-- IMPORTANT: replace the placeholder below with a long, random admin passphrase
-- (at least 32 characters) before running this script. Never put it in the app code.

create extension if not exists pgcrypto;

create table if not exists public.lurk_plus_admin_config (
  singleton boolean primary key default true check (singleton),
  secret_hash text not null
);

insert into public.lurk_plus_admin_config(singleton, secret_hash)
values (true, crypt('REPLACE_WITH_A_LONG_RANDOM_ADMIN_SECRET', gen_salt('bf', 12)))
on conflict (singleton) do update set secret_hash = excluded.secret_hash;

create table if not exists public.lurk_plus_links (
  id bigint generated always as identity primary key,
  member_id text not null,
  token_hash text not null unique,
  created_at timestamptz not null default now(),
  revoked_at timestamptz
);

create index if not exists lurk_plus_links_member_active_idx
  on public.lurk_plus_links(member_id) where revoked_at is null;

alter table public.lurk_plus_admin_config enable row level security;
alter table public.lurk_plus_links enable row level security;
revoke all on public.lurk_plus_admin_config from anon, authenticated;
revoke all on public.lurk_plus_links from anon, authenticated;

create or replace function public.lurk_plus_admin_ok(p_secret text)
returns boolean
language sql
security definer
set search_path = pg_catalog, public, extensions
as $$
  select exists (
    select 1 from public.lurk_plus_admin_config c
    where c.singleton = true and c.secret_hash = crypt(p_secret, c.secret_hash)
  );
$$;

create or replace function public.lurk_plus_create_link(p_member_id text, p_token text, p_admin_secret text)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public, extensions
as $$
declare
  members jsonb;
  member_row jsonb;
begin
  if p_admin_secret is null or length(p_admin_secret) < 24
     or not public.lurk_plus_admin_ok(p_admin_secret) then
    raise exception 'Yetkisiz işlem';
  end if;
  if p_token is null or length(p_token) < 32 then
    raise exception 'Geçersiz bağlantı anahtarı';
  end if;

  select value::jsonb into members from public.app_storage where key = 'lurk_plus_members';
  if jsonb_typeof(members) <> 'array' then
    raise exception 'LURK+ üye verisi bulunamadı';
  end if;

  select item into member_row
  from jsonb_array_elements(members) as e(item)
  where item->>'id' = p_member_id
  limit 1;

  if member_row is null then
    raise exception 'Üye bulunamadı';
  end if;

  update public.lurk_plus_links
  set revoked_at = now()
  where member_id = p_member_id and revoked_at is null;

  insert into public.lurk_plus_links(member_id, token_hash)
  values (p_member_id, encode(digest(p_token, 'sha256'), 'hex'));

  return jsonb_build_object('ok', true);
end;
$$;

create or replace function public.lurk_plus_revoke_links(p_member_id text, p_admin_secret text)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public, extensions
as $$
begin
  if p_admin_secret is null or length(p_admin_secret) < 24
     or not public.lurk_plus_admin_ok(p_admin_secret) then
    raise exception 'Yetkisiz işlem';
  end if;

  update public.lurk_plus_links
  set revoked_at = now()
  where member_id = p_member_id and revoked_at is null;

  return jsonb_build_object('ok', true);
end;
$$;

create or replace function public.lurk_plus_member_by_token(p_token text)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public, extensions
as $$
declare
  linked_member_id text;
  members jsonb;
  member_row jsonb;
begin
  if p_token is null or length(p_token) < 32 then
    return null;
  end if;

  select member_id into linked_member_id
  from public.lurk_plus_links
  where token_hash = encode(digest(p_token, 'sha256'), 'hex')
    and revoked_at is null
  limit 1;

  if linked_member_id is null then
    return null;
  end if;

  select value::jsonb into members from public.app_storage where key = 'lurk_plus_members';
  select item into member_row
  from jsonb_array_elements(coalesce(members, '[]'::jsonb)) as e(item)
  where item->>'id' = linked_member_id
  limit 1;

  if member_row is null then
    return null;
  end if;

  return jsonb_build_object(
    'name', member_row->>'name',
    'membershipType', coalesce(member_row->>'membershipType', 'balance'),
    'balance', coalesce(member_row->'balance', '0'::jsonb),
    'coffeeCredits', coalesce(member_row->'coffeeCredits', '0'::jsonb),
    'history', coalesce(member_row->'history', '[]'::jsonb),
    'updatedAt', member_row->>'updatedAt'
  );
end;
$$;

revoke all on function public.lurk_plus_admin_ok(text) from public, anon, authenticated;
revoke all on function public.lurk_plus_create_link(text, text, text) from public, anon, authenticated;
revoke all on function public.lurk_plus_revoke_links(text, text) from public, anon, authenticated;
revoke all on function public.lurk_plus_member_by_token(text) from public, anon, authenticated;

grant execute on function public.lurk_plus_create_link(text, text, text) to anon, authenticated;
grant execute on function public.lurk_plus_revoke_links(text, text) to anon, authenticated;
grant execute on function public.lurk_plus_member_by_token(text) to anon, authenticated;
