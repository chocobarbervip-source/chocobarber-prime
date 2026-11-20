'use client';
import {useState} from 'react';import {sb} from '@/lib/supabase';
export default function MyCard(){
const [p,setP]=useState(''),[r,setR]=useState<any>(null),[e,setE]=useState('');
const go=async(x:any)=>{x.preventDefault();setE('');setR(null);const {data,error}=await sb.rpc('my_card',{p_phone:p});if(error||!data?.[0])setE('No pudimos consultar. Inténtalo de nuevo.');else setR(data[0])};
const F=r?.free_at||7,H=r?.half_at||4,t=r?.total||0,c=t%F,x=c+1;
const pr=x===F?'¡Tu próximo corte es GRATIS!':x===H?'¡Tu próximo corte es a MITAD DE PRECIO!':`Te faltan ${(c<H?H:F)-c} cortes para tu próximo premio.`;
return(<div><form onSubmit={go} className="flex flex-wrap gap-3"><input required pattern="\+?[0-9 ]{7,15}" value={p} onChange={y=>setP(y.target.value)} placeholder="Tu número de teléfono" className="inp max-w-xs"/><button className="btn">Ver mi tarjeta</button></form>
{e&&<p className="mt-3 text-red-400">{e}</p>}
{r&&(t===0?<p className="mt-6 text-mist">Aún no tienes sellos. ¡Pídelo en tu próximo corte!</p>:<div className="mt-6"><p className="mb-3 text-mist">Llevas {t} sello{t===1?'':'s'} en total.</p>
<div className="flex flex-wrap gap-3">{Array.from({length:F},(_,i)=>{const n=i+1;return <div key={n} className={`grid h-14 w-14 place-items-center rounded-full border-2 font-display text-xl ${n<=c?'border-gold bg-gold text-ink':'border-white/30 text-white/50'}`}>{n===F?'🎁':n===H?'½':n}</div>})}</div>
<p className="mt-4 text-gold">{pr}</p><p className="mt-1 text-sm text-mist">½ = mitad de precio · 🎁 = corte gratis</p></div>)}</div>)}
