// ============================================================
// NEXUS — Logo (Opción 1 · Hub, variante A+B)
// El grupo entero (nodos + líneas) gira lento y continuo sobre
// el hub central, mientras pequeños paquetes de datos viajan
// de ida y vuelta por cada conexión. Es el mark oficial elegido.
// ============================================================

interface NexusLogoProps {
  size?: number
  animated?: boolean
  withWordmark?: boolean
  className?: string
}

export default function NexusLogo({ size = 64, animated = true, withWordmark = false, className = '' }: NexusLogoProps) {
  return (
    <div className={`nexus-logo ${className}`} style={{ display: 'flex', alignItems: 'center', gap: size * 0.28 }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g className={animated ? 'nx-orbit-group' : ''}>
          <line className="nx-line" x1="32" y1="32" x2="32" y2="10" />
          <line className="nx-line" x1="32" y1="32" x2="52" y2="44" />
          <line className="nx-line" x1="32" y1="32" x2="12" y2="44" />
          <circle className="nx-node" cx="32" cy="10" r="6.5" fill="var(--c6)" />
          <circle className="nx-node" cx="52" cy="44" r="6.5" fill="var(--c6)" />
          <circle className="nx-node" cx="12" cy="44" r="6.5" fill="var(--c6)" />
          <circle className="nx-core" cx="32" cy="32" r="10" fill="var(--c4)" />
          {animated && (
            <>
              <circle className="nx-packet nx-p1" r="2.6" />
              <circle className="nx-packet nx-p2" r="2.6" />
              <circle className="nx-packet nx-p3" r="2.6" />
            </>
          )}
        </g>
      </svg>

      {withWordmark && (
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: size * 0.62,
            color: 'var(--c6)',
            letterSpacing: '0.01em',
          }}
        >
          NEXUS
        </span>
      )}

      <style>{`
        .nx-line{ stroke: var(--c4); stroke-width: 4; stroke-linecap: round; fill: none; }
        .nx-core{ }
        .nx-orbit-group{
          transform-origin: 32px 32px;
          transform-box: fill-box;
          animation: nxSpin 16s linear infinite;
        }
        @keyframes nxSpin{ from{ transform: rotate(0deg); } to{ transform: rotate(360deg); } }

        .nx-packet{
          fill: var(--c6);
          offset-rotate: 0deg;
          animation: nxPacketMove 1.6s ease-in-out infinite alternate;
        }
        .nx-p1{ offset-path: path('M 32 32 L 32 10'); }
        .nx-p2{ offset-path: path('M 32 32 L 52 44'); }
        .nx-p3{ offset-path: path('M 32 32 L 12 44'); animation-delay: .2s; }
        .nx-p2{ animation-delay: .1s; }
        @keyframes nxPacketMove{ from{ offset-distance: 0%; } to{ offset-distance: 100%; } }
      `}</style>
    </div>
  )
}
