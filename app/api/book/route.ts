import {createClient} from '@supabase/supabase-js';
export async function POST(r:Request){
const b=await r.json();const name=String(b.name||'').trim(),phone=String(b.phone||'').replace(/\s/g,''),day=String(b.day||''),at=String(b.at||'');
const service=String(b.service||'').slice(0,100),notes=String(b.notes||'').slice(0,500);
if(name.length<3||!/^\+?\d{7,15}$/.test(phone)||!/^\d{4}-\d{2}-\d{2}$/.test(day)||!/^\d{2}:\d{2}/.test(at))return Response.json({error:'datos_invalidos'},{status:400});
const sb=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
const {data:bid,error}=await sb.rpc('book_slot',{p_name:name,p_phone:phone,p_day:day,p_at:at,p_service:service,p_notes:notes});
if(error)return Response.json({error:error.message},{status:error.message.includes('horario')?409:400});
let notified=false;const k=process.env.RESEND_API_KEY,to=process.env.OWNER_EMAIL;
if(k&&to){try{const x=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${k}`,'Content-Type':'application/json'},
body:JSON.stringify({from:process.env.MAIL_FROM||'onboarding@resend.dev',to,subject:`Nueva cita: ${name} — ${day} ${at.slice(0,5)}`,text:`Nombre: ${name}\nTeléfono: ${phone}\nFecha: ${day}\nHora: ${at.slice(0,5)}\nServicio: ${service||'-'}\nObservaciones: ${notes||'-'}`})});notified=x.ok}catch{}}
return Response.json({ok:true,notified,id:bid})}
