# CHOCOBARBER — guía rápida
**Pila:** Next.js + Tailwind + Supabase (base de datos y login) + Resend (correo). Todo tiene plan gratuito para empezar.
## 1. Base de datos (Supabase)
1. Crea cuenta en supabase.com → New project. 2. SQL Editor → pega `supabase/schema.sql` → Run.
3. Authentication → Users → Add user: tu correo y contraseña (ese es el acceso al panel). 4. Authentication → Sign In/Providers: desactiva "Allow new users to sign up" (así solo tú entras).
5. Project Settings → API: copia *Project URL* y la clave *anon public*.
## 2. Correr en tu computador
Instala Node.js (nodejs.org). Copia `.env.example` a `.env.local` y pega las dos claves. En la carpeta: `npm install` y `npm run dev` → http://localhost:3000. Panel: /admin
## 3. Avisos de nueva reserva (correo)
Crea cuenta en resend.com → API Keys. Pon en `.env.local`: `RESEND_API_KEY`, `OWNER_EMAIL` (tu correo). Sin dominio propio, Resend solo permite enviar al correo con que te registraste. Con dominio verificado, define también `MAIL_FROM`. Si faltan claves, la reserva se guarda igual pero NO se envía aviso (puedes verlas en el panel). WhatsApp Business API requiere cuenta Meta verificada; no está incluido.
## 4. Publicar
Sube la carpeta a GitHub → en vercel.com "Import project" → agrega las mismas variables de entorno → Deploy. Verifica los términos de Vercel para uso comercial (el plan gratis es para uso personal; alternativas: Netlify o Cloudflare Pages).
## 5. Primer uso
Panel → *Horarios y bloqueos*: agrega días y horas, define minutos por cita y marca "Agenda habilitada". Hasta entonces la web muestra "agenda pendiente".
## Editar textos y fotos
`lib/config.ts` (bio y especialidades de Aragon, fotos de la galería, enlaces). Fotos en `public/img/`.
