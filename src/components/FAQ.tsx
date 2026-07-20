import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const FAQS = [
  {
    q: '¿Qué es NEXUS exactamente?',
    a: 'Una plataforma SaaS multi-tenant: un mismo código base atiende a talleres, clínicas, restaurantes, inmobiliarias y decenas de sectores más. Cada negocio (tenant) tiene su propia información, su propia marca y sus propios módulos activos, sin compartir nada con los demás.',
  },
  {
    q: '¿Cómo funciona la arquitectura multi-tenant?',
    a: 'Cada tenant vive aislado dentro de la misma base de datos mediante políticas de seguridad a nivel de fila (RLS). Eso permite que agregar un negocio nuevo no implique levantar infraestructura nueva ni reescribir código: simplemente se activa su sector y sus módulos.',
  },
  {
    q: '¿La facturación electrónica DIAN viene incluida?',
    a: 'Sí. Es parte del núcleo de la plataforma, no un desarrollo aparte: queda lista desde el primer día para los sectores que la requieren.',
  },
  {
    q: '¿Puedo personalizar colores, logo y flujo de trabajo de mi negocio?',
    a: 'Sí. Cada tenant aplica su marca (colores, logo, tipografía) desde su propio panel, y ve únicamente los formularios, estados y reportes que corresponden a su sector.',
  },
  {
    q: '¿Qué pasa si mi sector no está en el catálogo?',
    a: 'El catálogo actual cubre 8 sectores y 34 módulos, pensados para cubrir la mayoría de operaciones del mercado colombiano. Si tu caso no encaja del todo, cuéntanos el detalle en el formulario y lo evaluamos.',
  },
  {
    q: '¿Cómo empiezo?',
    a: 'Solicita una demo desde el botón "Hablemos". Revisamos juntos qué sector y qué módulos encajan con tu operación antes de activar tu tenant.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="faq section-dark section-pad">
      <div className="container">
        <p className="eyebrow faq__eyebrow">Preguntas frecuentes</p>
        <h2 className="faq__title">Antes de que preguntes, probablemente ya está aquí.</h2>

        <div className="faq__list">
          {FAQS.map((item, i) => {
            const open = openIndex === i
            return (
              <motion.div
                key={item.q}
                className="faq__item"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <button
                  className="faq__q"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                >
                  <span>{item.q}</span>
                  <span className={`faq__plus ${open ? 'faq__plus--open' : ''}`} aria-hidden="true">
                    <span className="faq__plus-bar faq__plus-bar--v" />
                    <span className="faq__plus-bar faq__plus-bar--h" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      className="faq__a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                    >
                      <motion.p
                        initial={{ y: -8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -8, opacity: 0 }}
                        transition={{ duration: 0.22, delay: 0.04 }}
                      >
                        {item.a}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>

      <style>{`
        .faq__eyebrow{ color: var(--c5); }
        .faq__title{ margin-top: 16px; font-size: clamp(24px, 3.2vw, 36px); color: var(--c6); max-width: 640px; }

        .faq__list{ margin-top: 48px; max-width: 780px; display: flex; flex-direction: column; }
        .faq__item{ border-top: 1px solid rgba(225,245,238,0.1); }
        .faq__item:last-child{ border-bottom: 1px solid rgba(225,245,238,0.1); }

        .faq__q{
          width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 20px;
          padding: 22px 4px; background: none; border: none; text-align: left;
          font-family: var(--font-display); font-weight: 600; font-size: 16.5px; color: var(--c6);
        }
        .faq__plus{
          position: relative; width: 18px; height: 18px; flex-shrink: 0;
          transition: transform .3s ease;
        }
        .faq__plus--open{ transform: rotate(45deg); }
        .faq__plus-bar{
          position: absolute; background: var(--c4); border-radius: 2px; transition: background .25s ease;
        }
        .faq__plus-bar--v{ left: 50%; top: 0; bottom: 0; width: 2px; transform: translateX(-50%); }
        .faq__plus-bar--h{ top: 50%; left: 0; right: 0; height: 2px; transform: translateY(-50%); }

        .faq__a{ overflow: hidden; }
        .faq__a p{ padding: 0 4px 22px; max-width: 640px; font-size: 14.5px; line-height: 1.65; color: var(--c5); }
      `}</style>
    </section>
  )
}
