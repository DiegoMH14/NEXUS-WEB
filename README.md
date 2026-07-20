# NEXUS — Landing page

![React](https://img.shields.io/badge/React-18-149eca?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-0f6e56)

Landing page **informativa** de NEXUS, plataforma SaaS multi-tenant
pensada para el mercado colombiano (talleres, clínicas, restaurantes, inmobiliarias
y más sectores, todos sobre un mismo código base).

> **Nota:** este repositorio contiene únicamente el sitio de presentación del producto,
> no el código fuente de la plataforma NEXUS. El objetivo de esta página es comunicar
> la propuesta de valor y permitir que interesados **soliciten una demo** a través del
> formulario de contacto — el proyecto en sí no se publica aquí por motivos personales.

**🔗 Demo en vivo:** https://nexus-web-lime.vercel.app/

## Stack

React + TypeScript + Vite, sin frameworks de CSS (estilos embebidos por componente),
animaciones con [Framer Motion](https://www.framer.com/motion/) y envío de formulario
vía [EmailJS](https://www.emailjs.com/).

## Qué incluye

- **Splash de apertura** (`SplashIntro.tsx`) — 3 aros que vuelan desde distintos puntos
  y quedan entrelazados, aparece el wordmark "NEXUS" y una cortina se abre hacia la home.
  Se puede saltar con un clic o con el botón "Saltar intro".
- **Logo oficial** (`NexusLogo.tsx`) — variante hub (órbita + pulso de datos), usada en
  navbar y footer.
- **Hero de alto impacto** (`Hero.tsx` + `HubIllustration.tsx`) — ilustración del hub
  central con parallax de mouse, más estadísticas del catálogo con conteo animado.
- **Barra de confianza** (`TrustBar.tsx`) — marquee infinito con las garantías clave
  de la plataforma.
- **Propuesta de valor** (`About.tsx`) — el puente entre software genérico y software
  a la medida, más el stack técnico real.
- **Comparativa** (`Comparison.tsx`) — NEXUS vs. software genérico vs. desarrollo a medida.
- **8 sectores animados** (`Sectors.tsx` + `SectorHub.tsx`) — carrusel por sector; cada
  módulo muestra sus funcionalidades core y, al tocar el botón, sus opcionales (34 módulos
  en total, tomados 1:1 del catálogo real).
- **Preguntas frecuentes** (`FAQ.tsx`) — acordeón animado.
- **Contacto con EmailJS** (`Contact.tsx`) — formulario funcional (nombre, correo, empresa,
  sector, mensaje) que envía directo a tu bandeja vía la API REST de EmailJS.
- **Barra de progreso de scroll** (`ScrollProgress.tsx`) y botón "volver arriba".

Los datos completos del catálogo (8 sectores, 34 módulos, 290 funcionalidades core y
784 opcionales — 1074 en total) están en `src/data/sectors.ts`.

## Cómo correrlo localmente

```bash
npm install
npm run dev       # http://localhost:5173
```

Para producción:

```bash
npm run build     # genera /dist
npm run preview   # sirve /dist localmente para verificarlo
```

## Variables de entorno (EmailJS)

El formulario de contacto necesita 3 variables para enviar correos de verdad. Sin ellas,
simula el envío en consola (para poder seguir probando el diseño sin romper la demo).

1. Copia `.env.example` como `.env`.
2. Completa con tus credenciales de [dashboard.emailjs.com](https://dashboard.emailjs.com/admin):

   ```
   VITE_EMAILJS_SERVICE_ID=tu_service_id
   VITE_EMAILJS_TEMPLATE_ID=tu_template_id
   VITE_EMAILJS_PUBLIC_KEY=tu_public_key
   ```

3. Tu plantilla de EmailJS debe usar estas variables (así las envía el formulario):
   `{{from_name}}`, `{{from_email}}`, `{{company}}`, `{{sector}}`, `{{message}}`.

> El envío usa el SDK oficial `@emailjs/browser` (`emailjs.send(...)`), no la API REST
> a pelo. EmailJS bloquea las llamadas directas por `fetch` con el error *"API calls are
> disabled for non-browser applications"* porque no puede verificar que vienen de un
> navegador real — el SDK sí queda autorizado por defecto, sin tener que bajar la
> seguridad de la cuenta.

`.env` está en `.gitignore` y nunca se sube al repositorio.

## Desplegar en Vercel

1. Sube este proyecto a un repositorio de GitHub (ver sección siguiente).
2. Entra a [vercel.com](https://vercel.com/) → **Add New → Project** → importa el repo.
3. Vercel detecta automáticamente que es un proyecto **Vite**: no hace falta tocar el
   *Build Command* (`npm run build`) ni el *Output Directory* (`dist`).
4. Antes de darle **Deploy**, abre **Environment Variables** y agrega las 3 de EmailJS
   (las mismas del `.env` local):

   | Name | Value |
   |---|---|
   | `VITE_EMAILJS_SERVICE_ID` | tu service id |
   | `VITE_EMAILJS_TEMPLATE_ID` | tu template id |
   | `VITE_EMAILJS_PUBLIC_KEY` | tu public key |

5. Dale **Deploy**. Cada `push` a la rama principal vuelve a desplegar automáticamente.

## Subir el repo a GitHub

```bash
git init
git add .
git commit -m "feat: landing NEXUS"
git branch -M main
git remote add origin https://github.com/tu-usuario/nexus-landing.git
git push -u origin main
```

## Estructura

```
src/
  components/        # Splash, Navbar, Hero, HubIllustration, TrustBar, About,
                      # Comparison, Sectors, SectorHub, FAQ, Contact, Footer,
                      # NexusLogo, RingsMark, CountUp, ScrollProgress, BackToTop
  data/sectors.ts     # catálogo completo (8 sectores · 34 módulos)
  config/emailjs.ts   # credenciales desde variables de entorno
  styles/global.css   # tokens de marca (color, tipografía, radios)
```

## Notas de diseño

- Fondo alterna entre el verde oscuro de marca (`--c7`) en Hero/Sectores/Contacto y un
  papel claro (`--paper`) en la sección de propuesta de valor, para dar ritmo sin salir
  de la paleta oficial.
- La ilustración del hero y las tarjetas de sector reutilizan la misma lógica visual del
  logo (hub + nodos + líneas), para que el sitio se sienta como una extensión de la marca
  y no como una plantilla genérica encima de ella.
- Respeta `prefers-reduced-motion` en todas las animaciones (splash, parallax, marquee,
  conteos, watermark).

  ## Autor

**Diego Mendoza Hoyos** — Desarrollador y Diseñador
Tecnico en Programacion de Software, SENA y Estudiante de Ingeniera de Sistemas — Montería, Colombia

## Licencia

MIT © Diego Mendoza Hoyos (NEXUS DMH) — ver [LICENSE](./LICENSE).
