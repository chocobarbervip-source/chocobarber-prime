-- Pega en Supabase > SQL Editor > Run (una sola vez)
alter table settings add column half_at int not null default 4, add column free_at int not null default 7;
create table stamps(id serial primary key,phone text not null,name text,created_at timestamptz default now());
create index stamps_phone on stamps(phone);
alter table stamps enable row level security;
create policy admin_all on stamps for all to authenticated using(true) with check(true);
create function my_card(p_phone text) returns table(total int,half_at int,free_at int) language sql security definer set search_path=public as $$
 select (select count(*)::int from stamps where phone=regexp_replace(regexp_replace(p_phone,'\D','','g'),'^57(?=\d{10}$)','')),s.half_at,s.free_at from settings s $$;
grant execute on function my_card(text) to anon,authenticated;
