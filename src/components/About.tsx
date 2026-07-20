import { motion } from 'framer-motion'

const STEPS = [
  {
    n: '01',
    title: 'Un mismo hub, un solo código',
    text: 'NEXUS corre sobre una arquitectura multi-tenant en React, TypeScript y Supabase. Cada negocio nuevo no implica reescribir nada: se conecta al mismo hub que ya sirve a los demás.',
  },
  {
    n: '02',
    title: 'El sector define el módulo',
    text: 'Un catálogo de 34 módulos —de talleres a fincas raíz— define qué formularios, estados y reportes ve cada tenant. El superadmin activa el sector y NEXUS arma la experiencia.',
  },
  {
    n: '03',
    title: 'Marca y flujo, a la medida',
    text: 'Colores, logo y tipografía del negocio se aplican en vivo desde el panel del tenant. Por debajo, factura electrónica DIAN, control de caja y reportes quedan listos desde el primer día.',
  },
]

export default function About() {
  return (
    <section id="como-funciona" className="about section-pad">
      <div className="about__blob about__blob--a" aria-hidden="true" />
      <div className="about__blob about__blob--b" aria-hidden="true" />
      <div className="about__grid-lines" aria-hidden="true" />

      <div className="container">
        <motion.span
          className="about__badge"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          <span className="about__badge-dot" />
          El puente entre lo genérico y lo costoso
        </motion.span>

        <motion.h2
          className="about__title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.08 }}
        >
          El software genérico no entiende tu operación.
          <br />
          <span className="about__title-accent">El software a la medida no entiende tu presupuesto.</span>
        </motion.h2>

        <motion.div
          className="about__contrast"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.16, duration: 0.55 }}
        >
          <div className="about__contrast-side">
            <span className="about__contrast-label">Sin NEXUS</span>
            <strong>34 desarrollos distintos</strong>
            <span className="about__contrast-sub">un sistema nuevo por cada sector</span>
          </div>

          <motion.div
            className="about__contrast-arrow"
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            →
          </motion.div>

          <div className="about__contrast-side about__contrast-side--solid">
            <span className="about__contrast-label">Con NEXUS</span>
            <strong>1 solo código</strong>
            <span className="about__contrast-sub">34 configuraciones, ya listas</span>
          </div>
        </motion.div>

        <div className="about__steps">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              className="about__step"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -6 }}
            >
              <motion.span
                className="about__step-bar"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.12 + 0.1, duration: 0.6, ease: 'easeOut' }}
              />
              <span className="about__step-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="about__stack">
          <span className="eyebrow">Construido con</span>
          <div className="about__stack-chips">
            {['React', 'TypeScript', 'Supabase', 'Vite', 'Facturación DIAN', 'Arquitectura multi-tenant'].map((t, i) => (
              <motion.span
                key={t}
                className="about__chip"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                whileHover={{ y: -3, backgroundColor: 'rgba(15,110,86,0.12)' }}
              >
                <span className="about__chip-dot" />
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .about{ position: relative; background: var(--paper); color: var(--ink); overflow: hidden; }

        .about__blob{
          position: absolute; border-radius: 50%; filter: blur(60px); pointer-events: none;
        }
        .about__blob--a{
          width: 480px; height: 480px; top: -180px; right: -140px;
          background: radial-gradient(circle, rgba(29,158,117,0.18) 0%, rgba(29,158,117,0) 70%);
          animation: aboutBlobFloat 12s ease-in-out infinite;
        }
        .about__blob--b{
          width: 380px; height: 380px; bottom: -160px; left: -120px;
          background: radial-gradient(circle, rgba(93,202,165,0.16) 0%, rgba(93,202,165,0) 70%);
          animation: aboutBlobFloat 14s ease-in-out infinite reverse;
        }
        @keyframes aboutBlobFloat{
          0%,100%{ transform: translate(0,0) scale(1); }
          50%{ transform: translate(-18px,24px) scale(1.08); }
        }
        .about__grid-lines{
          position: absolute; inset: 0; opacity: .5; pointer-events: none;
          background-image: linear-gradient(rgba(15,110,86,0.05) 1px, transparent 1px);
          background-size: 100% 64px;
        }

        .about__badge{
          position: relative; display: inline-flex; align-items: center; gap: 9px;
          font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;
          color: var(--c6); background: var(--c7); padding: 9px 16px 9px 14px; border-radius: 999px;
          margin-bottom: 22px;
        }
        .about__badge-dot{
          width: 7px; height: 7px; border-radius: 50%; background: var(--c4);
          animation: aboutDotPulse 1.8s ease-in-out infinite;
        }
        @keyframes aboutDotPulse{ 0%,100%{ opacity: 1; transform: scale(1); } 50%{ opacity: .5; transform: scale(1.5); } }

        .about__title{
          position: relative; font-size: clamp(26px, 3.4vw, 40px); line-height: 1.24; max-width: 780px; color: var(--ink);
        }
        .about__title-accent{ color: var(--c1); }

        .about__contrast{
          position: relative; margin-top: 48px; display: flex; align-items: center; gap: 22px;
          max-width: 780px; flex-wrap: wrap;
        }
        .about__contrast-side{
          flex: 1; min-width: 200px; padding: 22px 24px; border-radius: var(--radius-md);
          background: var(--paper-2); border: 1px solid rgba(8,32,26,0.08);
        }
        .about__contrast-side--solid{
          background: var(--c7); border-color: var(--c7);
        }
        .about__contrast-side--solid strong{ color: var(--c6); }
        .about__contrast-side--solid .about__contrast-label{ color: var(--c4); }
        .about__contrast-side--solid .about__contrast-sub{ color: var(--c5); }
        .about__contrast-label{
          display: block; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--ink-soft); margin-bottom: 8px;
        }
        .about__contrast-side strong{
          display: block; font-family: var(--font-display); font-size: 22px; color: var(--ink);
        }
        .about__contrast-sub{
          display: block; margin-top: 6px; font-size: 13px; color: var(--ink-soft);
        }
        .about__contrast-arrow{
          font-size: 22px; color: var(--c1); font-weight: 700;
        }

        .about__steps{
          position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-top: 72px;
        }
        .about__step{
          position: relative; padding-top: 22px; transition: box-shadow .25s ease;
        }
        .about__step-bar{
          display: block; height: 2px; width: 100%; background: var(--c1);
          transform-origin: left; margin-bottom: 22px;
        }
        .about__step-n{
          font-family: var(--font-mono); font-size: 12px; color: var(--c3); letter-spacing: 0.1em;
        }
        .about__step h3{
          margin-top: 12px; font-size: 20px; color: var(--ink);
        }
        .about__step p{
          margin-top: 12px; font-size: 15px; line-height: 1.6; color: var(--ink-soft);
        }

        .about__stack{
          position: relative; margin-top: 88px; padding-top: 36px; border-top: 1px solid rgba(8,32,26,0.1);
          display: flex; align-items: center; gap: 24px; flex-wrap: wrap;
        }
        .about__stack > .eyebrow{ color: var(--ink-soft); }
        .about__stack-chips{ display: flex; gap: 10px; flex-wrap: wrap; }
        .about__chip{
          display: inline-flex; align-items: center; gap: 7px;
          font-family: var(--font-mono); font-size: 12px; color: var(--c1);
          border: 1px solid rgba(15,110,86,0.28); background: rgba(15,110,86,0.06);
          padding: 7px 14px; border-radius: 999px; cursor: default;
        }
        .about__chip-dot{ width: 5px; height: 5px; border-radius: 50%; background: var(--c3); }

        @media (max-width: 860px){
          .about__steps{ grid-template-columns: 1fr; gap: 36px; }
          .about__contrast{ flex-direction: column; align-items: stretch; }
          .about__contrast-arrow{ transform: rotate(90deg); align-self: center; }
        }
        @media (prefers-reduced-motion: reduce){
          .about__blob, .about__badge-dot{ animation: none !important; }
        }
      `}</style>
    </section>
  )
}
