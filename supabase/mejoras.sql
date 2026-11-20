-- Pega en Supabase > SQL Editor > Run (una sola vez)
create function get_booking(p_id uuid) returns table(name text,day date,at time,status text) language sql security definer set search_path=public as
$$ select name,day,at,status from bookings where id=p_id $$;
create function cancel_booking(p_id uuid) returns boolean language plpgsql security definer set search_path=public as $$
begin update bookings set status='cancelada' where id=p_id and status<>'cancelada' and ((day+at) at time zone 'America/Bogota')>now(); return found; end $$;
create table reviews(id serial primary key,name text not null,stars int not null check(stars between 1 and 5),body text not null,approved boolean not null default false,created_at timestamptz default now());
alter table reviews enable row level security;
create policy admin_all on reviews for all to authenticated using(true) with check(true);
create policy public_read on reviews for select to anon using(approved);
create function submit_review(p_name text,p_stars int,p_body text) returns void language plpgsql security definer set search_path=public as $$
begin if length(trim(p_name))<2 or length(trim(p_body))<5 or length(p_body)>400 or p_stars not between 1 and 5 then raise exception 'datos_invalidos'; end if;
insert into reviews(name,stars,body) values(left(trim(p_name),60),p_stars,trim(p_body)); end $$;
grant execute on function get_booking(uuid),cancel_booking(uuid),submit_review(text,int,text) to anon,authenticated;
