'use client';
import {useState} from 'react';import {CFG} from '@/lib/config';
export default function Gallery(){const [z,setZ]=useState('');
const P=(s:string,l:string)=>(<button onClick={()=>setZ(s)} className="group relative flex-1 overflow-hidden"><img src={s} alt={l} loading="lazy" className="aspect-[4/5] w-full object-cover object-[50%_30%] transition duration-700 group-hover:scale-105"/><span className="absolute left-2 top-2 bg-black/70 px-2 py-1 font-display text-sm tracking-widest text-gold">{l}</span></button>);
return(<><div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">{CFG.gallery.map((g,i)=>(<div key={i} className="flex w-[88%] shrink-0 snap-center gap-2 md:w-[55%]">{P(g.before,'ANTES')}{P(g.after,'DESPUÉS')}</div>))}</div>
{z&&<div onClick={()=>setZ('')} className="fixed inset-0 z-50 grid place-items-center bg-black/95 p-4"><img src={z} className="max-h-full max-w-full object-contain" alt="Foto ampliada"/></div>}</>)}
