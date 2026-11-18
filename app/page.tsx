import Gallery from '@/components/Gallery';import Booking from '@/components/Booking';import {CFG} from '@/lib/config';
const maps=`https://www.google.com/maps?q=${encodeURIComponent(CFG.address)}`;
const nav=[['Inicio','#inicio'],['Nosotros','#nosotros'],['Galería','#galeria'],['Reservar cita','#reservar'],['Ubicación','#ubicacion'],['Contacto','#contacto']];
export default function Home(){return(<main>
<header className="fixed inset-x-0 top-0 z-30 flex items-center gap-6 bg-black/80 px-5 py-3 backdrop-blur"><b className="font-display text-2xl font-black tracking-wider text-gold">CHOCOBARBER</b>
<nav className="flex gap-5 overflow-x-auto whitespace-nowrap text-sm text-mist">{nav.map(([n,h])=><a key={h} href={h} className="transition hover:text-gold">{n}</a>)}</nav></header>
<section id="inicio" className="relative grid min-h-screen place-items-center bg-cover bg-center px-6 text-center" style={{backgroundImage:'linear-gradient(rgba(5,5,5,.82),rgba(5,5,5,.92)),url(/img/mural.jpg)'}}>
<div className="hero-in max-w-3xl"><h1 className="font-display text-[clamp(3.5rem,15vw,9rem)] font-black leading-none tracking-wide">CHOCOBARBER</h1>
<p className="mt-4 font-display text-3xl text-gold md:text-5xl">TU ESTILO, NUESTRA FIRMA.</p>
<p className="mx-auto mt-5 max-w-xl text-mist">Más que un corte, una experiencia. Precisión, estilo y personalidad en cada detalle.</p>
<div className="mt-8 flex flex-wrap justify-center gap-3"><a href="#reservar" className="btn">Reservar mi cita</a><a href="#nosotros" className="btn2">Conócenos</a></div></div></section>
<div className="pole"/>
<section id="nosotros" className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-24 md:grid-cols-2">
<img src="/img/mural.jpg" alt="Mural de ChocoBarber" className="w-full border border-gold/30"/>
<div><h2 className="font-display text-5xl font-black">Nosotros</h2><p className="mt-4 leading-relaxed text-mist">En ChocoBarber cada corte se trabaja con precisión y atención al detalle. Nos mueve la pasión por la barbería y la confianza de quien se sienta en nuestra silla: salir con un estilo propio, bien hecho, que se note.</p></div></section>
<section className="bg-coal px-6 py-24"><div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[2fr_3fr]">
<img src={CFG.aragon.photo} alt="Aragon, barbero estrella" className="aspect-[4/5] w-full object-cover object-top"/>
<div><h2 className="font-display text-6xl font-black text-gold">ARAGON</h2><p className="font-display text-2xl">Nuestro barbero estrella</p>
{CFG.aragon.bio&&<p className="mt-4 text-mist">{CFG.aragon.bio}</p>}
{CFG.aragon.specialties.length>0&&<ul className="mt-4 flex flex-wrap gap-2">{CFG.aragon.specialties.map(s=><li key={s} className="border border-gold/50 px-3 py-1 text-sm">{s}</li>)}</ul>}</div></div></section>
<section id="galeria" className="mx-auto max-w-6xl px-6 py-24"><h2 className="font-display text-5xl font-black">Antes y después</h2><p className="mb-8 mt-2 text-mist">Mira la calidad de nuestros cortes antes de reservar. Desliza y toca una foto para ampliarla.</p><Gallery/></section>
<div className="pole"/>
<section id="reservar" className="mx-auto max-w-4xl px-6 py-24"><h2 className="mb-8 font-display text-5xl font-black">Reservar cita</h2><Booking/></section>
<section id="ubicacion" className="bg-coal px-6 py-24"><div className="mx-auto max-w-5xl"><h2 className="font-display text-5xl font-black">Ubicación</h2><p className="my-3 text-mist">{CFG.address}</p>
<iframe title="Mapa" src={`${maps}&output=embed`} loading="lazy" className="h-80 w-full border-0 grayscale"/>
<div className="mt-4 flex flex-wrap gap-3"><a className="btn" target="_blank" href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CFG.address)}`}>Cómo llegar</a><a className="btn2" target="_blank" href={maps}>Abrir en Google Maps</a></div></div></section>
<section id="contacto" className="mx-auto max-w-4xl px-6 py-24 text-center"><h2 className="font-display text-5xl font-black">Contacto</h2>
<p className="mt-4 text-mist">{CFG.address}</p><p className="text-mist">WhatsApp: 320 218 7269 · Instagram: {CFG.igUser}</p>
<div className="mt-6 flex flex-wrap justify-center gap-3"><a className="btn" target="_blank" href={`https://wa.me/${CFG.wa}`}>Escribir por WhatsApp</a><a className="btn2" target="_blank" href={CFG.ig}>Visitar Instagram</a></div></section>
<footer className="pole"/><p className="py-8 text-center font-display text-xl tracking-widest text-gold">CHOCOBARBER — EL ESTILO NO SE IMPROVISA, SE TRABAJA.</p>
</main>)}
