// ============================================================
// NEXUS — Splash de apertura (v2 · aros asimétricos + halo)
// Los tres aros llegan volando desde tres puntos bien distintos
// y lejanos de la pantalla, con trayectorias curvas y llegan
// girados en ángulos distintos entre sí. Un halo pulsante y un
// destello de convergencia le dan más cuerpo al aterrizaje.
// Luego emerge el wordmark "NEXUS" y, al final, la cortina se
// abre para revelar la página principal.
// ============================================================

import { useEffect, useState } from 'react'

interface SplashIntroProps {
  onComplete: () => void
}

const WORD = ['N', 'E', 'X', 'U', 'S']

export default function SplashIntro({ onComplete }: SplashIntroProps) {
  const [exiting, setExiting] = useState(false)
  const [skippable, setSkippable] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const holdTime = reduced ? 1400 : 3200
    const exitTime = reduced ? 1800 : 3820

    const t1 = setTimeout(() => setSkippable(true), 900)
    const t2 = setTimeout(() => setExiting(true), holdTime)
    const t3 = setTimeout(onComplete, exitTime)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const skip = () => {
    setExiting(true)
    setTimeout(onComplete, 620)
  }

  return (
    <div className={`splash ${exiting ? 'splash--exit' : ''}`} onClick={skip} role="presentation">
      <div className="splash__curtain splash__curtain--left" aria-hidden="true" />
      <div className="splash__curtain splash__curtain--right" aria-hidden="true" />
      <div className="splash__halo" aria-hidden="true" />
      <div className="splash__stage">
        <svg className="splash__mark" viewBox="0 0 95 97" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <ellipse className="splash-ring r-c" cx="22.52" cy="69.28" rx="15" ry="25.57" />
          <ellipse className="splash-ring r-a" cx="34.97" cy="27.71" rx="15" ry="25.57" />
          <ellipse className="splash-ring r-b" cx="64.75" cy="59.28" rx="15" ry="25.57" />
          <circle className="splash__burst" cx="42" cy="49" r="6" />
        </svg>

        <div className="splash__word" aria-label="NEXUS">
          {WORD.map((letter, i) => (
            <span key={letter + i} className="splash__letter" style={{ animationDelay: `${1.15 + i * 0.08}s` }}>
              {letter}
            </span>
          ))}
        </div>

        <div className="splash__tag">Plataforma multi-tenant</div>
      </div>

      {skippable && <button className="splash__skip" onClick={skip}>Saltar intro →</button>}

      <style>{`
        .splash{
          position: fixed; inset: 0; z-index: 999; overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .splash--exit{ pointer-events: none; }
        .splash--exit .splash__stage, .splash--exit .splash__halo, .splash--exit .splash__skip{
          opacity: 0 !important; transform: scale(0.94); transition: opacity .32s ease, transform .32s ease;
        }

        .splash__curtain{
          position: absolute; top: 0; bottom: 0; width: 50%; z-index: 0;
          background-image: radial-gradient(120% 120% at 50% 40%, #0a4a3c 0%, var(--c7) 65%);
          background-repeat: no-repeat; background-size: 100vw 100vh;
          transition: transform .6s cubic-bezier(.6,0,.32,1);
        }
        .splash__curtain--left{ left: 0; background-position: 0 0; }
        .splash__curtain--right{ right: 0; background-position: -50vw 0; }
        .splash--exit .splash__curtain--left{ transform: translateX(-100%); }
        .splash--exit .splash__curtain--right{ transform: translateX(100%); }

        .splash__halo{
          position: absolute; width: min(70vw, 520px); aspect-ratio: 1; border-radius: 50%;
          background: radial-gradient(circle, rgba(93,202,165,0.30) 0%, rgba(93,202,165,0) 70%);
          opacity: 0; animation: nxHaloIn 1.4s ease forwards .15s, nxHaloPulse 3.4s ease-in-out infinite 1.4s;
        }
        @keyframes nxHaloIn{ to{ opacity: 1; } }
        @keyframes nxHaloPulse{ 0%,100%{ transform: scale(1); opacity: .8; } 50%{ transform: scale(1.12); opacity: 1; } }

        .splash__stage{ position: relative; display: flex; flex-direction: column; align-items: center; gap: 26px; }
        .splash__mark{ width: min(38vw, 240px); height: auto; overflow: visible; }

        .splash-ring{
          stroke-width: 8.94; fill: none; fill-opacity: 0; stroke-opacity: 1;
          stroke-dasharray: 130; stroke-dashoffset: 130;
          transform-box: fill-box; transform-origin: center;
        }
        .r-a{ stroke: var(--c3); animation: nxDraw .9s cubic-bezier(.3,.7,.25,1) forwards, nxFlyA .9s cubic-bezier(.24,.6,.22,1.18) forwards; }
        .r-b{ stroke: var(--c4); animation: nxDraw .9s cubic-bezier(.3,.7,.25,1) forwards .12s, nxFlyB .9s cubic-bezier(.24,.6,.22,1.18) forwards .12s; }
        .r-c{ stroke: var(--c6); animation: nxDraw .9s cubic-bezier(.3,.7,.25,1) forwards .24s, nxFlyC .9s cubic-bezier(.24,.6,.22,1.18) forwards .24s; }

        @keyframes nxDraw{ to{ stroke-dashoffset: 0; } }

        /* Aro A: llega en picada desde muy arriba, girando */
        @keyframes nxFlyA{
          0%{ transform: translate(6px,-180px) rotate(210deg) scale(.25); opacity: 0; }
          45%{ transform: translate(-10px,-40px) rotate(175deg) scale(.75); opacity: 1; }
          100%{ transform: translate(0,0) rotate(149.02deg) scale(1); opacity: 1; }
        }
        /* Aro B: entra desde muy abajo a la derecha */
        @keyframes nxFlyB{
          0%{ transform: translate(200px,150px) rotate(-30deg) scale(.25); opacity: 0; }
          45%{ transform: translate(55px,45px) rotate(40deg) scale(.75); opacity: 1; }
          100%{ transform: translate(0,0) rotate(89.02deg) scale(1); opacity: 1; }
        }
        /* Aro C: entra desde muy abajo a la izquierda, trayectoria opuesta */
        @keyframes nxFlyC{
          0%{ transform: translate(-200px,150px) rotate(140deg) scale(.25); opacity: 0; }
          45%{ transform: translate(-55px,45px) rotate(75deg) scale(.75); opacity: 1; }
          100%{ transform: translate(0,0) rotate(29.02deg) scale(1); opacity: 1; }
        }

        .splash__burst{
          fill: var(--c5); opacity: 0; transform-box: fill-box; transform-origin: center;
          animation: nxBurst .6s ease-out forwards 1.05s;
        }
        @keyframes nxBurst{
          0%{ opacity: .9; transform: scale(0); }
          70%{ opacity: .35; transform: scale(3.6); }
          100%{ opacity: 0; transform: scale(4.6); }
        }

        .splash__word{ display: flex; }
        .splash__letter{
          font-family: var(--font-display); font-weight: 700;
          font-size: clamp(34px, 7vw, 56px); line-height: 1; color: var(--c6);
          letter-spacing: 0.02em; opacity: 0;
          animation: nxLetterIn .55s cubic-bezier(.2,.7,.2,1) forwards;
        }
        @keyframes nxLetterIn{ 0%{ opacity: 0; transform: translateX(-16px) scale(.75); } 100%{ opacity: 1; transform: translateX(0) scale(1); } }

        .splash__tag{
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase;
          color: var(--c5); opacity: 0; animation: nxTagIn .5s ease forwards; animation-delay: 1.75s;
        }
        @keyframes nxTagIn{ from{ opacity: 0; transform: translateY(4px); } to{ opacity: 1; transform: translateY(0); } }

        .splash__skip{
          position: absolute; bottom: 30px; right: 30px;
          font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.05em;
          background: rgba(225,245,238,.08); border: 1px solid rgba(225,245,238,.22); color: var(--c5);
          padding: 9px 16px; border-radius: 999px; opacity: 0; animation: nxTagIn .4s ease forwards;
        }
        .splash__skip:hover{ background: rgba(225,245,238,.16); }

        @media (prefers-reduced-motion: reduce){
          .splash-ring{ animation: none !important; stroke-dashoffset: 0; opacity: 1; transform: none; }
          .splash__letter{ animation: none !important; opacity: 1; transform: none; }
          .splash__tag{ animation: none !important; opacity: 1; }
          .splash__halo{ animation: none !important; opacity: .6; }
          .splash__burst{ display: none; }
          .splash__curtain{ transition: none; }
          .splash--exit .splash__stage, .splash--exit .splash__halo, .splash--exit .splash__skip{ transition: none; }
        }
      `}</style>
    </div>
  )
}
