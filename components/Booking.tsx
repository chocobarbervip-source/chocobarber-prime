'use client';
import {useEffect,useState} from 'react';import {sb} from '@/lib/supabase';
const today=()=>new Date().toLocaleDateString('en-CA',{timeZone:'America/Bogota'});
const fmt=(d:string)=>new Date(d+'T12:00').toLocaleDateString('es-CO',{dateStyle:'full'});
export default function Booking(){
const [ready,setReady]=useState<boolean|null>(null),[day,setDay]=useState(''),[slots,setSlots]=useState<any[]>([]),[at,setAt]=useState(''),[msg,setMsg]=useState(''),[done,setDone]=useState<any>(null),[busy,setBusy]=useState(false);
useEffect(()=>{sb.rpc('agenda_ready').then(({data})=>setReady(!!data))},[]);
const pick=async(d:string)=>{setDay(d);setAt('');const {data}=await sb.rpc('available_slots',{d});setSlots(data||[])};
const send=async(e:any)=>{e.preventDefault();if(!at){setMsg('Elige una hora.');return}setBusy(true);setMsg('');
 const f:any=Object.fromEntries(new FormData(e.target));
 const r=await fetch('/api/book',{method:'POST',body:JSON.stringify({...f,day,at})});const j=await r.json();setBusy(false);
 if(j.ok)setDone({...f,day,at});else{setMsg(j.error==='horario_no_disponible'?'Ese horario acaba de ocuparse. Elige otro.':'Revisa tu nombre y tu teléfono e inténtalo de nuevo.');pick(day)}};
if(ready===null)return <p className="text-mist">Cargando agenda…</p>;
if(!ready)return <p className="border border-gold/40 p-6 text-mist">La agenda está pendiente de habilitación. Mientras tanto, escríbenos por WhatsApp para reservar.</p>;
if(done)return(<div className="border border-gold p-8 text-center"><h3 className="font-display text-4xl font-black text-gold">¡TU CITA ESTÁ RESERVADA!</h3><p className="mt-2 text-mist">Gracias por elegir ChocoBarber. Nos vemos pronto.</p>
<dl className="mt-6 space-y-1"><dd>{done.name}</dd><dd>{fmt(done.day)} · {done.at.slice(0,5)}</dd>{done.service&&<dd>{done.service}</dd>}{done.notes&&<dd className="text-mist">{done.notes}</dd>}</dl></div>);
return(<form onSubmit={send} className="grid gap-4 md:grid-cols-2">
<div><label className="mb-1 block text-sm text-mist">Fecha</label><input type="date" required min={today()} value={day} onChange={e=>pick(e.target.value)} className="inp"/>
{day&&<div className="mt-4 grid grid-cols-3 gap-2">{slots.length===0&&<p className="col-span-3 text-mist">No hay horarios para este día.</p>}
{slots.map(s=>(<button type="button" key={s.slot} disabled={!s.free} onClick={()=>setAt(s.slot)} className={`py-2 text-sm transition ${at===s.slot?'bg-gold text-ink':s.free?'border border-gold/60 hover:bg-gold/20':'border border-white/10 text-white/30 line-through'}`}>{s.slot.slice(0,5)}</button>))}</div>}</div>
<div className="grid gap-3"><input name="name" required minLength={3} placeholder="Nombre completo" className="inp"/><input name="phone" required pattern="\+?[0-9]{7,15}" inputMode="tel" placeholder="Teléfono" className="inp"/>
<input name="service" maxLength={100} placeholder="Servicio que quieres" className="inp"/><textarea name="notes" maxLength={500} placeholder="Observaciones (opcional)" className="inp"/>
{msg&&<p className="text-red-400">{msg}</p>}<button disabled={busy} className="btn">{busy?'Guardando…':'Reservar mi cita'}</button></div></form>)}
