// ============================================================
// NEXUS — Ilustración de hero: el logo principal en grande.
// En vez del mapa radial de 8 sectores, ahora se muestra solo
// la figura del logo (el mark oficial), en gran tamaño, con un
// halo pulsante y partículas orbitando alrededor para darle
// más presencia y movimiento a la pieza protagonista del hero.
// ============================================================
import NexusLogo from './NexusLogo'

export default function HubIllustration() {
  return (
    <div className="hero-mark">
      <div className="hero-mark__halo" aria-hidden="true" />
      <div className="hero-mark__ring hero-mark__ring--a" aria-hidden="true" />
      <div className="hero-mark__ring hero-mark__ring--b" aria-hidden="true" />

      <svg className="hero-mark__orbit" viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle className="hero-mark__dot hero-mark__dot--1" cx="220" cy="40" r="4" />
        <circle className="hero-mark__dot hero-mark__dot--2" cx="400" cy="300" r="3.4" />
        <circle className="hero-mark__dot hero-mark__dot--3" cx="60" cy="320" r="3" />
      </svg>

      <div className="hero-mark__logo">
        <NexusLogo size={300} animated withWordmark={false} />
      </div>

      <style>{`
        .hero-mark{
          position: relative; width: min(96vw, 460px); aspect-ratio: 1;
          margin: 0 auto; display: flex; align-items: center; justify-content: center;
        }

        .hero-mark__halo{
          position: absolute; inset: 6%; border-radius: 50%;
          background: radial-gradient(circle, rgba(93,202,165,0.32) 0%, rgba(93,202,165,0) 70%);
          animation: heroMarkPulse 3.6s ease-in-out infinite;
        }
        @keyframes heroMarkPulse{ 0%,100%{ transform: scale(1); opacity: .75; } 50%{ transform: scale(1.08); opacity: 1; } }

        .hero-mark__ring{
          position: absolute; border-radius: 50%; border: 1px solid rgba(159,225,203,0.22);
        }
        .hero-mark__ring--a{ inset: 12%; animation: heroMarkSpin 34s linear infinite; }
        .hero-mark__ring--b{ inset: 20%; border-style: dashed; border-color: rgba(93,202,165,0.28); animation: heroMarkSpin 24s linear infinite reverse; }
        @keyframes heroMarkSpin{ from{ transform: rotate(0deg); } to{ transform: rotate(360deg); } }

        .hero-mark__orbit{ position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
        .hero-mark__dot{ fill: var(--c5); opacity: .8; }
        .hero-mark__dot--1{ animation: heroMarkOrbit1 12s linear infinite; transform-origin: 220px 220px; }
        .hero-mark__dot--2{ animation: heroMarkOrbit2 17s linear infinite; transform-origin: 220px 220px; }
        .hero-mark__dot--3{ animation: heroMarkOrbit3 20s linear infinite reverse; transform-origin: 220px 220px; }
        @keyframes heroMarkOrbit1{ from{ transform: rotate(0deg); } to{ transform: rotate(360deg); } }
        @keyframes heroMarkOrbit2{ from{ transform: rotate(0deg); } to{ transform: rotate(360deg); } }
        @keyframes heroMarkOrbit3{ from{ transform: rotate(0deg); } to{ transform: rotate(360deg); } }

        .hero-mark__logo{
          position: relative; filter: drop-shadow(0 18px 46px rgba(4,52,44,0.55));
          animation: heroMarkFloat 5s ease-in-out infinite;
        }
        @keyframes heroMarkFloat{ 0%,100%{ transform: translateY(0); } 50%{ transform: translateY(-10px); } }

        @media (max-width: 620px){
          .hero-mark__logo svg{ width: min(58vw, 220px) !important; height: min(58vw, 220px) !important; }
        }
        @media (prefers-reduced-motion: reduce){
          .hero-mark__halo, .hero-mark__ring, .hero-mark__dot, .hero-mark__logo{ animation: none !important; }
        }
      `}</style>
    </div>
  )
}
