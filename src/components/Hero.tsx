import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import HubIllustration from './HubIllustration'
import { totales } from '../data/sectors'
import CountUp from './CountUp'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.4 })
  const springY = useSpring(my, { stiffness: 120, damping: 18, mass: 0.4 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [7, -7])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-7, 7])
  const translateX = useTransform(springX, [-0.5, 0.5], [-14, 14])
  const translateY = useTransform(springY, [-0.5, 0.5], [-14, 14])

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const onMouseLeave = () => { mx.set(0); my.set(0) }

  return (
    <section id="top" className="hero" ref={sectionRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__grid">
        <div>
          <motion.p
            className="eyebrow hero__eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Plataforma SaaS multi-tenant · Mercado colombiano
          </motion.p>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.6 }}
          >
            Un solo código base.
            <br />
            <span className="hero__title-accent">Un sector distinto para cada cliente.</span>
          </motion.h1>

          <motion.p
            className="hero__sub"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.6 }}
          >
            NEXUS conecta a un mismo hub la operación de talleres, clínicas, restaurantes, inmobiliarias
            y treinta sectores más — cada tenant con su propia experiencia, su propio flujo de trabajo
            y su facturación electrónica DIAN, sin pagar el precio de un desarrollo a medida.
          </motion.p>

          <motion.div
            className="hero__ctas"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46, duration: 0.6 }}
          >
            <a href="#contacto" className="btn btn--solid">Solicitar una demo</a>
            <a href="#sectores" className="btn btn--ghost">Explorar los 8 sectores ↓</a>
          </motion.div>

          <motion.div
            className="hero__stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div>
              <strong><CountUp to={totales.sectores} />{' '}</strong>
              <span>sectores activos</span>
            </div>
            <div>
              <strong><CountUp to={totales.modulos} /></strong>
              <span>módulos del catálogo</span>
            </div>
            <div>
              <strong><CountUp to={totales.core + totales.opcionales} /></strong>
              <span>funcionalidades mapeadas</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          style={{ perspective: 800 }}
        >
          <motion.div style={{ x: translateX, y: translateY, rotateX, rotateY }}>
            <HubIllustration />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .hero{
          position: relative; overflow: hidden;
          background: var(--c7); color: var(--c6);
          padding: 168px 0 96px;
        }
        .hero__glow{
          position: absolute; inset: -20% -10% auto -10%; height: 720px;
          background: radial-gradient(60% 60% at 30% 20%, rgba(29,158,117,0.35), transparent 70%),
                      radial-gradient(45% 45% at 85% 10%, rgba(93,202,165,0.22), transparent 70%);
          pointer-events: none;
        }
        .hero__grid{
          position: relative; display: grid; grid-template-columns: 1.05fr 0.95fr;
          gap: 40px; align-items: center;
        }
        .hero__eyebrow{ color: var(--c5); margin-bottom: 22px; }
        .hero__title{
          font-size: clamp(34px, 4.6vw, 58px); line-height: 1.06; color: var(--c6); font-weight: 700;
        }
        .hero__title-accent{ color: var(--c4); }
        .hero__sub{
          margin-top: 26px; max-width: 520px; font-size: 17px; line-height: 1.65; color: var(--c5);
        }
        .hero__ctas{ display: flex; gap: 16px; margin-top: 38px; flex-wrap: wrap; }
        .btn{
          font-family: var(--font-body); font-weight: 700; font-size: 15px; padding: 15px 26px; border-radius: 999px;
          transition: transform .15s ease, background .15s ease, border-color .15s ease;
          display: inline-block;
        }
        .btn--solid{ background: var(--c4); color: var(--c7); }
        .btn--solid:hover{ background: var(--c6); transform: translateY(-2px); }
        .btn--ghost{ border: 1px solid rgba(225,245,238,0.28); color: var(--c6); }
        .btn--ghost:hover{ border-color: var(--c4); color: var(--c4); transform: translateY(-2px); }

        .hero__stats{
          display: flex; gap: 40px; margin-top: 56px; padding-top: 28px;
          border-top: 1px solid rgba(225,245,238,0.14); flex-wrap: wrap;
        }
        .hero__stats strong{
          display: block; font-family: var(--font-display); font-size: 30px; color: var(--c6);
        }
        .hero__stats span{
          font-family: var(--font-mono); font-size: 11px; letter-spacing: .05em; color: var(--c5); text-transform: uppercase;
        }

        @media (max-width: 900px){
          .hero__grid{ grid-template-columns: 1fr; }
          .hero{ padding: 140px 0 60px; }
        }
      `}</style>
    </section>
  )
}
