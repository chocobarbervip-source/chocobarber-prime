'use client';
import {useEffect,useState} from 'react';import {sb} from '@/lib/supabase';
export default function Cita(){
const [id,setId]=useState(''),[b,setB]=useState<any>(null),[m,setM]=useState(''),[ld,setLd]=useState(true);
useEffect(()=>{const i=new URLSearchParams(location.search).get('id')||'';setId(i);if(!/^[0-9a-f-]{36}$/.test(i)){setLd(false);return}sb.rpc('get_booking',{p_id:i}).then(({data})=>{setB(data?.[0]||null);setLd(false)})},[]);
const cancel=async()=>{if(!confirm('¿Seguro que quieres cancelar tu cita?'))return;const {data}=await sb.rpc('cancel_booking',{p_id:id});if(data){setB({...b,status:'cancelada'});setM('Tu cita fue cancelada.')}else setM('No se pudo cancelar. Escríbenos por WhatsApp.')};
const f=b&&new Date(b.day+'T12:00').toLocaleDateString('es-CO',{dateStyle:'full'});
return(<main className="mx-auto max-w-lg px-6 py-24"><h1 className="font-display text-5xl font-black text-gold">Tu cita</h1>
{ld?<p className="mt-4 text-mist">Cargando…</p>:!b?<p className="mt-4 text-mist">No encontramos esta cita.</p>:<div className="mt-6 border border-white/15 p-6"><p>{b.name}</p><p>{f} · {b.at.slice(0,5)}</p><p className="mt-1 text-gold">Estado: {b.status}</p>
{b.status!=='cancelada'&&<div className="mt-5 flex flex-wrap gap-3"><button className="btn2" onClick={cancel}>Cancelar mi cita</button></div>}{m&&<p className="mt-4">{m}</p>}
{b.status==='cancelada'&&<a className="btn mt-5" href="/#reservar">Reservar de nuevo</a>}<p className="mt-5 text-sm text-mist">Para cambiar la hora: cancela y reserva una nueva.</p></div>}</main>)}
