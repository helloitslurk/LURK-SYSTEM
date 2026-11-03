-- LURK personal finance storage-key hotfix
-- Run this in Supabase SQL Editor. It only adds the personal-debts key
-- to the existing authenticated POS storage RPC allowlist.

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
  if p_key not in ('lurk_t','lurk_o','lurk_l','lurk_m','lurk_d','lurk_customers','lurk_credit','lurk_plus_members','lurk_personal_debts') then
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
  if p_key not in ('lurk_t','lurk_o','lurk_l','lurk_m','lurk_d','lurk_customers','lurk_credit','lurk_plus_members','lurk_personal_debts') then
    raise exception 'Geçersiz veri anahtarı';
  end if;
  insert into public.app_storage(key, value, updated_at)
  values (p_key, to_jsonb(p_value::text), now())
  on conflict (key) do update set value = excluded.value, updated_at = now();
  return true;
end;
$$;

revoke all on function public.lurk_pos_storage_get(text,text) from public, anon, authenticated;
revoke all on function public.lurk_pos_storage_set(text,text,jsonb) from public, anon, authenticated;
grant execute on function public.lurk_pos_storage_get(text,text) to anon, authenticated;
grant execute on function public.lurk_pos_storage_set(text,text,jsonb) to anon, authenticated;
