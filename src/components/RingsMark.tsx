// ============================================================
// NEXUS — Marca de aros (la misma figura del splash de apertura,
// sin las letras). Pensada para usarse como núcleo visual en
// piezas donde el logo debe respirar solo, con una animación de
// vida sutil (rotación lenta + respiración) en vez del aterrizaje
// del splash.
// ============================================================

interface RingsMarkProps {
  size?: number
  animated?: boolean
  className?: string
}

export default function RingsMark({ size = 110, animated = true, className = '' }: RingsMarkProps) {
  return (
    <div className={`rings-mark ${className}`} style={{ width: size, height: size * (97 / 95) }}>
      <svg
        className={animated ? 'rings-mark__spin' : ''}
        viewBox="0 0 95 97"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <ellipse className="rings-mark__ring rm-c" cx="22.52" cy="69.28" rx="15" ry="25.57" />
        <ellipse className="rings-mark__ring rm-a" cx="34.97" cy="27.71" rx="15" ry="25.57" />
        <ellipse className="rings-mark__ring rm-b" cx="64.75" cy="59.28" rx="15" ry="25.57" />
      </svg>

      <style>{`
        .rings-mark{ position: relative; }
        .rings-mark svg{ width: 100%; height: 100%; overflow: visible; }

        .rings-mark__ring{ stroke-width: 8.94; fill: none; transform-box: fill-box; transform-origin: center; }
        .rm-a{ stroke: var(--c3); }
        .rm-b{ stroke: var(--c4); }
        .rm-c{ stroke: var(--c6); }

        .rings-mark__spin{ animation: ringsMarkBreathe 4.2s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
        @keyframes ringsMarkBreathe{
          0%,100%{ transform: scale(1) rotate(0deg); }
          50%{ transform: scale(1.045) rotate(2.5deg); }
        }

        @media (prefers-reduced-motion: reduce){
          .rings-mark__spin{ animation: none; }
        }
      `}</style>
    </div>
  )
}
