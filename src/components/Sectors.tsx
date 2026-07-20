import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { sectores } from '../data/sectors'
import SectorHub from './SectorHub'

export default function Sectors() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = sectores.find(s => s.id === activeId) ?? null

  return (
    <section id="sectores" className="sectors section-dark section-pad">
      <div className="container">
        <p className="eyebrow sectors__eyebrow">El catálogo, sector por sector</p>
        <h2 className="sectors__title">8 sectores conectados al mismo hub.</h2>
        <p className="sectors__sub">
          {active
            ? 'Toca un submódulo para ver sus funcionalidades core y opcionales.'
            : 'Toca un sector para abrir su hub y ver los módulos conectados.'}
        </p>

        <div className="sectors__stage">
          <AnimatePresence mode="wait">
            {!active ? (
              <motion.div
                key="grid"
                className="sectors__grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                {sectores.map((s, i) => (
                  <motion.button
                    key={s.id}
                    className="sector-card"
                    onClick={() => setActiveId(s.id)}
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6, scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                  >
                    <span className="sector-card__glow" aria-hidden="true" />
                    <span className="sector-card__port" aria-hidden="true" />
                    <span className="sector-card__top">
                      <span className="sector-card__index">{String(i + 1).padStart(2, '0')}</span>
                      <span className="sector-card__arrow" aria-hidden="true">↗</span>
                    </span>
                    <span className="sector-card__name">{s.nombre}</span>
                    <span className="sector-card__desc">{s.descripcion}</span>
                    <span className="sector-card__count">
                      {s.modulos.length} módulo{s.modulos.length > 1 ? 's' : ''}
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="hub"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              >
                <button className="sectors__back" onClick={() => setActiveId(null)}>
                  ← Volver a sectores
                </button>
                <SectorHub sector={active} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .sectors__eyebrow{ color: var(--c5); }
        .sectors__title{ margin-top: 16px; font-size: clamp(26px, 3.4vw, 40px); color: var(--c6); }
        .sectors__sub{ margin-top: 18px; max-width: 620px; color: var(--c5); font-size: 15.5px; line-height: 1.6; }

        .sectors__stage{ margin-top: 56px; }

        .sectors__back{
          font-family: var(--font-mono); font-size: 12px; letter-spacing: .04em; color: var(--c7);
          background: var(--c5); border: none; padding: 9px 16px; border-radius: 999px;
          margin-bottom: 32px; transition: background .2s ease, transform .2s ease;
        }
        .sectors__back:hover{ background: var(--c6); transform: translateX(-3px); }

        .sectors__grid{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

        .sector-card{
          position: relative; text-align: left; background: rgba(8,32,26,0.35);
          border: 1px solid rgba(225,245,238,0.1); border-radius: 18px; padding: 24px 20px 20px;
          display: flex; flex-direction: column; gap: 10px; min-height: 190px; overflow: hidden;
          transition: border-color .25s ease, background .25s ease, box-shadow .25s ease;
        }
        .sector-card::before{
          content: ''; position: absolute; inset: 0; border-radius: 18px; padding: 1px;
          background: linear-gradient(135deg, rgba(93,202,165,0), rgba(93,202,165,.55), rgba(93,202,165,0));
          background-size: 240% 240%; background-position: 0% 0%;
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          opacity: 0; transition: opacity .3s ease;
          pointer-events: none;
        }
        .sector-card:hover::before{ opacity: 1; animation: sectorSweep 2.6s linear infinite; }
        @keyframes sectorSweep{ 0%{ background-position: 0% 0%; } 100%{ background-position: 240% 240%; } }

        .sector-card:hover{ box-shadow: 0 18px 40px -18px rgba(93,202,165,0.35); border-color: rgba(93,202,165,0.4); }

        .sector-card__glow{
          position: absolute; top: -60%; right: -30%; width: 200px; height: 200px; border-radius: 50%;
          background: radial-gradient(circle, rgba(93,202,165,0.28) 0%, rgba(93,202,165,0) 70%);
          opacity: 0; transition: opacity .35s ease; pointer-events: none;
        }
        .sector-card:hover .sector-card__glow{ opacity: 1; }

        .sector-card__port{
          position: absolute; top: -1px; left: 24px; width: 18px; height: 3px; border-radius: 0 0 3px 3px;
          background: var(--c4); opacity: 0.8; transition: width .25s ease, opacity .25s ease;
        }
        .sector-card:hover .sector-card__port{ width: 40px; }

        .sector-card__top{ display: flex; align-items: center; justify-content: space-between; }
        .sector-card__index{
          font-family: var(--font-mono); font-size: 11.5px; font-weight: 700; color: var(--c7); letter-spacing: .04em;
          background: var(--paper); padding: 4px 9px; border-radius: 999px;
        }
        .sector-card__arrow{
          display: inline-flex; font-size: 14px; color: var(--c5); line-height: 1;
          width: 22px; height: 22px; align-items: center; justify-content: center;
          border-radius: 50%; border: 1px solid rgba(225,245,238,0.16);
          transition: color .2s ease, border-color .2s ease, transform .2s ease;
        }
        .sector-card:hover .sector-card__arrow{ color: var(--c4); border-color: rgba(93,202,165,0.5); transform: translate(2px,-2px); }

        .sector-card__name{ font-family: var(--font-display); font-weight: 600; font-size: 17px; color: var(--c6); }
        .sector-card__desc{ font-size: 12.5px; color: var(--c5); line-height: 1.5; flex: 1; }
        .sector-card__count{
          font-family: var(--font-mono); font-size: 10.5px; color: var(--paper); text-transform: uppercase; letter-spacing: .05em;
          padding-top: 10px; border-top: 1px solid rgba(225,245,238,0.1);
        }

        @media (max-width: 1040px){ .sectors__grid{ grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px){ .sectors__grid{ grid-template-columns: 1fr; } }

        @media (prefers-reduced-motion: reduce){
          .sector-card::before{ animation: none !important; }
        }
      `}</style>
    </section>
  )
}
