import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import NexusLogo from './NexusLogo'

const LINKS = [
  { href: '#sectores', label: 'Sectores' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#contacto', label: 'Hablemos' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      initial={{ y: -76, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container nav__row">
        <a href="#top" className="nav__brand" aria-label="NEXUS — inicio">
          <NexusLogo size={34} />
          <span>NEXUS</span>
        </a>

        <nav className="nav__links">
          {LINKS.map(l => (
            <a key={l.href} href={l.href} className="nav__link">{l.label}</a>
          ))}
        </nav>

        <a href="#contacto" className="nav__cta">Solicitar demo</a>

        <button className="nav__burger" onClick={() => setOpen(o => !o)} aria-label="Abrir menú">
          <span /><span /><span />
        </button>
      </div>

      {open && (
        <motion.div
          className="nav__mobile"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href="#contacto" className="nav__mobile-cta" onClick={() => setOpen(false)}>Solicitar demo</a>
        </motion.div>
      )}

      <style>{`
        .nav{
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          background: transparent;
          transition: background .25s ease, backdrop-filter .25s ease, border-color .25s ease;
          border-bottom: 1px solid transparent;
        }
        .nav--scrolled{
          background: rgba(4,52,44,0.82);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(225,245,238,0.08);
        }
        .nav__row{
          display: flex; align-items: center; justify-content: space-between;
          height: 76px;
        }
        .nav__brand{
          display: flex; align-items: center; gap: 10px;
          font-family: var(--font-display); font-weight: 700; font-size: 19px; color: var(--c6);
        }
        .nav__links{ display: flex; gap: 34px; }
        .nav__link{
          position: relative; font-family: var(--font-mono); font-size: 12.5px; letter-spacing: 0.06em;
          text-transform: uppercase; color: var(--c5); transition: color .15s ease; padding-bottom: 3px;
        }
        .nav__link::after{
          content: ''; position: absolute; left: 0; right: 0; bottom: -1px; height: 1.5px;
          background: var(--c4); transform: scaleX(0); transform-origin: right; transition: transform .25s ease;
        }
        .nav__link:hover{ color: var(--c6); }
        .nav__link:hover::after{ transform: scaleX(1); transform-origin: left; }
        .nav__cta{
          position: relative;
          font-family: var(--font-body); font-weight: 700; font-size: 13.5px;
          background: var(--c4); color: var(--c7); padding: 10px 20px; border-radius: 999px;
          transition: transform .15s ease, background .15s ease;
          animation: navCtaBreathe 3.2s ease-in-out infinite;
        }
        .nav__cta:hover{ background: var(--c6); transform: translateY(-1px); animation-play-state: paused; }
        @keyframes navCtaBreathe{
          0%,100%{ box-shadow: 0 0 0 0 rgba(93,202,165,0.45); }
          50%{ box-shadow: 0 0 0 7px rgba(93,202,165,0); }
        }
        .nav__burger{ display: none; flex-direction: column; gap: 5px; background: none; border: none; padding: 6px; }
        .nav__burger span{ width: 22px; height: 2px; background: var(--c6); border-radius: 2px; }

        .nav__mobile{
          display: none;
        }

        @media (max-width: 780px){
          .nav__links, .nav__cta{ display: none; }
          .nav__burger{ display: flex; }
          .nav--scrolled, .nav{ background: rgba(4,52,44,0.92); backdrop-filter: blur(10px); }
          .nav__mobile{
            display: flex; flex-direction: column; gap: 2px; padding: 10px 20px 22px;
            background: rgba(4,52,44,0.97); border-top: 1px solid rgba(225,245,238,.1);
          }
          .nav__mobile a{
            padding: 14px 4px; font-family: var(--font-mono); font-size: 13px; letter-spacing: .05em;
            color: var(--c5); border-bottom: 1px solid rgba(225,245,238,.06);
          }
          .nav__mobile-cta{ color: var(--c4) !important; font-weight: 700; }
        }

        @media (prefers-reduced-motion: reduce){
          .nav__cta{ animation: none; }
        }
      `}</style>
    </motion.header>
  )
}
