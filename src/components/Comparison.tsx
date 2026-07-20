import { motion } from 'framer-motion'

const ROWS = [
  { label: 'Tiempo de implementación', generic: 'Rápido', custom: 'Meses', nexus: 'Días' },
  { label: 'Costo inicial', generic: 'Bajo', custom: 'Alto', nexus: 'Accesible' },
  { label: 'Personalización por sector', generic: 'Ninguna o limitada', custom: 'Total', nexus: 'Por sector, ya definida' },
  { label: 'Factura electrónica DIAN', generic: 'Rara vez incluida', custom: 'Depende del desarrollo', nexus: 'Incluida desde el día uno' },
  { label: 'Mantenimiento y mejoras', generic: 'A cargo del proveedor genérico', custom: 'A cargo tuyo o de tu equipo', nexus: 'Incluido, mismo código para todos' },
  { label: 'Sumar un negocio nuevo', generic: 'Otra licencia genérica', custom: 'Otro proyecto desde cero', nexus: 'Se activa el sector, listo' },
]

export default function Comparison() {
  return (
    <section className="comparison section-pad">
      <div className="container">
        <motion.p
          className="eyebrow comparison__eyebrow"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          Cómo se compara
        </motion.p>
        <motion.h2
          className="comparison__title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.06 }}
        >
          Tres formas de resolver lo mismo. Solo una escala con tu negocio.
        </motion.h2>

        <motion.div
          className="comparison__table"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.12, duration: 0.5 }}
        >
          <div className="comparison__row comparison__row--head">
            <span className="comparison__cell comparison__cell--label" />
            <span className="comparison__cell">Software genérico</span>
            <span className="comparison__cell">Desarrollo a medida</span>
            <span className="comparison__cell comparison__cell--nexus">NEXUS</span>
          </div>

          {ROWS.map((r, i) => (
            <motion.div
              key={r.label}
              className="comparison__row"
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <span className="comparison__cell comparison__cell--label">{r.label}</span>
              <span className="comparison__cell" data-label="Software genérico">{r.generic}</span>
              <span className="comparison__cell" data-label="Desarrollo a medida">{r.custom}</span>
              <span className="comparison__cell comparison__cell--nexus" data-label="NEXUS">
                {r.nexus}
                {i === 0 && (
                  <motion.span
                    className="comparison__badge"
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: 0.3, duration: 0.3, ease: 'backOut' }}
                  >
                    Recomendado
                  </motion.span>
                )}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .comparison{ background: var(--paper); color: var(--ink); }
        .comparison__eyebrow{ color: var(--c1); margin-bottom: 18px; }
        .comparison__title{ font-size: clamp(24px, 3.2vw, 36px); line-height: 1.24; max-width: 680px; color: var(--ink); }

        .comparison__table{
          margin-top: 48px; border-radius: var(--radius-lg); overflow: hidden;
          border: 1px solid rgba(8,32,26,0.1); background: var(--paper-2);
        }
        .comparison__row{
          display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr;
          border-top: 1px solid rgba(8,32,26,0.08);
        }
        .comparison__row:first-child{ border-top: none; }
        .comparison__row--head{ background: transparent; }
        .comparison__row--head .comparison__cell{
          font-family: var(--font-mono); font-size: 11px; letter-spacing: .08em; text-transform: uppercase;
          color: var(--ink-soft); padding-bottom: 6px;
        }
        .comparison__row--head .comparison__cell--nexus{ color: var(--c1); font-weight: 700; }

        .comparison__cell{
          padding: 16px 18px; font-size: 14px; color: var(--ink); display: flex; align-items: center;
        }
        .comparison__cell--label{
          font-family: var(--font-display); font-weight: 600; font-size: 14px; color: var(--ink);
          background: transparent;
        }
        .comparison__cell--nexus{
          position: relative; background: rgba(15,110,86,0.07); color: var(--c2); font-weight: 700;
        }

        .comparison__badge{
          position: absolute; top: -11px; right: 14px;
          font-family: var(--font-mono); font-size: 9px; letter-spacing: .06em; text-transform: uppercase;
          background: var(--c1); color: var(--c6); padding: 3px 9px; border-radius: 999px;
        }

        @media (max-width: 760px){
          .comparison__row--head{ display: none; }
          .comparison__row{ grid-template-columns: 1fr; }
          .comparison__cell{ padding: 6px 18px; }
          .comparison__cell--label{ padding-top: 18px; }
          .comparison__cell:not(.comparison__cell--label)::before{
            content: attr(data-label) ': '; font-family: var(--font-mono); font-size: 10px;
            text-transform: uppercase; color: var(--ink-soft); margin-right: 6px;
          }
          .comparison__cell--nexus{ padding-bottom: 18px; border-radius: 0 0 10px 10px; }
        }
      `}</style>
    </section>
  )
}
