-- Pega todo en Supabase > SQL Editor > Run
create table settings(id int primary key default 1 check(id=1),slot_minutes int not null default 30,enabled boolean not null default false);
insert into settings(id) values(1);
create table weekly_hours(id serial primary key,dow int not null check(dow between 0 and 6),opens time not null,closes time not null,break_start time,break_end time);
create table blocks(id serial primary key,day date not null,from_time time,to_time time,reason text);
create table bookings(id uuid primary key default gen_random_uuid(),name text not null,phone text not null,day date not null,at time not null,service text,notes text,
 status text not null default 'pendiente' check(status in('pendiente','confirmada','cancelada')),created_at timestamptz default now());
create unique index uniq_slot on bookings(day,at) where status<>'cancelada'; -- evita reservas duplicadas
do $$ declare t text; begin foreach t in array array['settings','weekly_hours','blocks','bookings'] loop
 execute format('alter table %I enable row level security',t);
 execute format('create policy admin_all on %I for all to authenticated using(true) with check(true)',t); end loop; end $$;
create function agenda_ready() returns boolean language sql security definer set search_path=public as
$$select (select enabled from settings) and exists(select 1 from weekly_hours)$$;
create function available_slots(d date) returns table(slot time,free boolean) language sql security definer set search_path=public as $$
 select t::time,not(
  exists(select 1 from bookings b where b.day=d and b.at=t::time and b.status<>'cancelada')
  or exists(select 1 from blocks k where k.day=d and(k.from_time is null or(t::time>=k.from_time and t::time<k.to_time)))
  or (t at time zone 'America/Bogota')<=now())
 from settings s,weekly_hours w,
 lateral generate_series(d+w.opens,d+w.closes-make_interval(mins=>s.slot_minutes),make_interval(mins=>s.slot_minutes)) t
 where s.enabled and w.dow=extract(dow from d)
 and not(w.break_start is not null and t::time>=w.break_start and t::time<w.break_end) order by 1 $$;
create function book_slot(p_name text,p_phone text,p_day date,p_at time,p_service text,p_notes text) returns uuid
language plpgsql security definer set search_path=public as $$
declare v uuid; begin
 if length(trim(p_name))<3 or p_phone !~ '^\+?[0-9]{7,15}$' then raise exception 'datos_invalidos'; end if;
 if not exists(select 1 from available_slots(p_day) where slot=p_at and free) then raise exception 'horario_no_disponible'; end if;
 insert into bookings(name,phone,day,at,service,notes) values(trim(p_name),p_phone,p_day,p_at,p_service,p_notes) returning id into v; return v;
exception when unique_violation then raise exception 'horario_no_disponible'; end $$;
grant execute on function agenda_ready(),available_slots(date),book_slot(text,text,date,time,text,text) to anon,authenticated;
