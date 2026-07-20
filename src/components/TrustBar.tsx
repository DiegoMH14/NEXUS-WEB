const ITEMS = [
  {
    label: 'Factura electrónica DIAN integrada',
    icon: (
      <path d="M7 3h13l4 4v20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
    ),
  },
  {
    label: 'Datos aislados por tenant',
    icon: (
      <path d="M16 3l11 5v8c0 8-5 13.5-11 16-6-2.5-11-8-11-16V8l11-5z" />
    ),
  },
  {
    label: 'Autenticación segura por Magic Link',
    icon: (
      <path d="M9 16a7 7 0 1 1 5.6 6.86L13 25H10v3H6v3H2v-4l9.14-9.14A7 7 0 0 1 9 16z" />
    ),
  },
  {
    label: 'Pensado para el mercado colombiano',
    icon: (
      <path d="M6 4v24M6 4h18l-3.5 6L24 16H6" />
    ),
  },
]

// Se duplica la lista para que el loop del marquee sea continuo
// (cuando la primera copia sale, la segunda ya está entrando).
const LOOP = [...ITEMS, ...ITEMS]

export default function TrustBar() {
  return (
    <section className="trustbar" aria-label="Garantías de la plataforma">
      <div className="trustbar__viewport">
        <div className="trustbar__track">
          {LOOP.map((item, i) => (
            <div className="trustbar__item" key={item.label + i}>
              <svg className="trustbar__icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {item.icon}
              </svg>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .trustbar{
          background: var(--c7); border-top: 1px solid rgba(225,245,238,0.08); border-bottom: 1px solid rgba(225,245,238,0.08);
          padding: 28px 0; overflow: hidden;
        }
        .trustbar__viewport{
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
        }
        .trustbar__track{
          display: flex; width: max-content; gap: 64px;
          animation: trustbarMarquee 28s linear infinite;
        }
        .trustbar__viewport:hover .trustbar__track{ animation-play-state: paused; }

        @keyframes trustbarMarquee{
          from{ transform: translateX(0); }
          to{ transform: translateX(-50%); }
        }

        .trustbar__item{ display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
        .trustbar__icon{ width: 26px; height: 26px; color: var(--c4); flex-shrink: 0; }
        .trustbar__item span{
          font-family: var(--font-mono); font-size: 12px; letter-spacing: .02em; color: var(--c5);
          line-height: 1.4; white-space: nowrap;
        }

        @media (prefers-reduced-motion: reduce){
          .trustbar__track{ animation: none; flex-wrap: wrap; }
          .trustbar__viewport{ -webkit-mask-image: none; mask-image: none; }
        }
      `}</style>
    </section>
  )
}
