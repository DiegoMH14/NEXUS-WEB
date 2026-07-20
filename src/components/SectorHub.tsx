// ============================================================
// NEXUS — Hub de un sector: carrusel real de tarjetas compactas
// que muestran TODAS las funcionalidades core de una vez (sin
// pasos extra de clic) y un botón "Ver opcionales" que expande
// esa lista dentro de la misma tarjeta. Se mueve sola (autoplay)
// y también se puede arrastrar con el mouse — sin flechas.
// El RingsMark vive como marca de agua de fondo de la sección.
// ============================================================
import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Modulo, Sector } from '../data/sectors'
import RingsMark from './RingsMark'

const TAG_LABEL: Record<string, string> = {
  nuevo: 'Nuevo',
  trasladada: 'Reubicado',
  'no-oficial': 'Piloto',
}

function ModuleCard({
  modulo, index, expanded, onToggle, cardRef,
}: {
  modulo: Modulo
  index: number
  expanded: boolean
  onToggle: () => void
  cardRef: (el: HTMLDivElement | null) => void
}) {
  return (
    <motion.div
      ref={cardRef}
      className={`shub-card ${expanded ? 'shub-card--open' : ''}`}
      layout
      style={{ transformPerspective: 900 }}
      initial={{ opacity: 0, scale: 0.78, rotate: index % 2 === 0 ? -7 : 7, y: 36 }}
      animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
      transition={{ delay: 0.06 + index * 0.07, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ y: -4, scale: 1.012 }}
    >
      <span className="shub-card__glow" aria-hidden="true" />

      <div className="shub-card__top">
        <span className="shub-card__index">{String(index + 1).padStart(2, '0')}</span>
        {modulo.tag && <span className="shub-card__tag">{TAG_LABEL[modulo.tag]}</span>}
      </div>

      <h4 className="shub-card__name">{modulo.nombre}</h4>
      <p className="shub-card__tagline">{modulo.tagline}</p>

      <div className="shub-body__chips">
        {modulo.coreFeatures.map(f => (
          <span key={f} className="shub-body__chip shub-body__chip--core">{f}</span>
        ))}
      </div>

      <button className="shub-body__more" onClick={onToggle}>
        {expanded ? 'Ocultar opcionales' : `Ver ${modulo.opcionales} opcionales`}
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="opt"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="shub-body__opt-wrap"
          >
            <div className="shub-body__chips">
              {modulo.optFeatures.map(f => (
                <span key={f} className="shub-body__chip">{f}</span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="shub-card__counts">
        <span><strong>{modulo.core}</strong> core</span>
        <span><strong>{modulo.opcionales}</strong> opcionales</span>
      </div>
    </motion.div>
  )
}

export default function SectorHub({ sector }: { sector: Sector }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const drag = useRef({ dragging: false, startX: 0, startScroll: 0, moved: false })

  useEffect(() => {
    setActiveIndex(0)
    setExpandedId(null)
    trackRef.current?.scrollTo({ left: 0 })
  }, [sector.id])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const idx = cardRefs.current.findIndex(el => el === entry.target)
            if (idx !== -1) setActiveIndex(idx)
          }
        })
      },
      { root: track, threshold: [0.6] }
    )

    cardRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [sector.id])

  const scrollToIndex = (i: number) => {
    const clamped = Math.max(0, Math.min(sector.modulos.length - 1, i))
    cardRefs.current[clamped]?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
  }

  // Autoplay: avanza sola cada 2s. Se pausa con el mouse encima,
  // mientras se arrastra, o mientras una tarjeta tiene los
  // opcionales abiertos (para no interrumpir la lectura).
  useEffect(() => {
    if (paused || expandedId) return
    const id = setInterval(() => {
      const next = (activeIndex + 1) % sector.modulos.length
      scrollToIndex(next)
    }, 2000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, expandedId, activeIndex, sector.id])

  // Arrastre con mouse en el track (touch ya funciona nativo)
  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current
    drag.current.moved = false
    // Si el clic empieza sobre un botón (u otro control interactivo),
    // no arrancamos el drag ni capturamos el puntero: así el click
    // llega intacto al botón (p. ej. "Ver opcionales").
    const target = e.target as HTMLElement
    if (target.closest('button, a, input, textarea, select')) return
    if (!track || e.pointerType !== 'mouse') return
    drag.current = { dragging: true, startX: e.clientX, startScroll: track.scrollLeft, moved: false }
    track.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const track = trackRef.current
    if (!track || !drag.current.dragging) return
    const dx = e.clientX - drag.current.startX
    if (Math.abs(dx) > 6) drag.current.moved = true
    track.scrollLeft = drag.current.startScroll - dx
  }
  const endDrag = (e: React.PointerEvent) => {
    const track = trackRef.current
    drag.current.dragging = false
    if (track && track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId)
  }

  return (
    <div className="shub">
      <div className="shub__head">
        <h3>{sector.nombre}</h3>
        <p>{sector.descripcion}</p>
      </div>

      <div
        className="shub__stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="shub__watermark" aria-hidden="true">
          <RingsMark size={420} animated={false} />
        </div>

        <div
          className="shub__track"
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
        >
          {sector.modulos.map((m, i) => (
            <ModuleCard
              key={m.id}
              modulo={m}
              index={i}
              expanded={expandedId === m.id}
              onToggle={() => {
                if (drag.current.moved) { drag.current.moved = false; return }
                setExpandedId(prev => (prev === m.id ? null : m.id))
              }}
              cardRef={(el) => { cardRefs.current[i] = el }}
            />
          ))}
        </div>

        <div className="shub__dots">
          {sector.modulos.map((m, i) => (
            <button
              key={m.id}
              className={`shub__dot ${i === activeIndex ? 'shub__dot--active' : ''}`}
              onClick={() => scrollToIndex(i)}
              aria-label={`Ir al módulo ${m.nombre}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        .shub__head{ text-align: center; max-width: 560px; margin: 0 auto; }
        .shub__head h3{ font-size: 24px; color: var(--c6); }
        .shub__head p{ margin-top: 8px; color: var(--c5); font-size: 14.5px; line-height: 1.6; }

        .shub__stage{ position: relative; margin-top: 44px; }

        .shub__watermark{
          position: absolute; top: 50%; left: 50%;
          opacity: 0.05; pointer-events: none; z-index: 0;
          animation: shubWatermarkSpin 90s linear infinite;
        }
        @keyframes shubWatermarkSpin{
          from{ transform: translate(-50%, -50%) rotate(0deg); }
          to{ transform: translate(-50%, -50%) rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce){
          .shub__watermark{ animation: none; transform: translate(-50%, -50%); }
        }

        .shub__track{
          position: relative; z-index: 1;
          display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch; padding-bottom: 4px; align-items: flex-start;
          cursor: grab; touch-action: pan-y;
        }
        .shub__track:active{ cursor: grabbing; }
        .shub__track::-webkit-scrollbar{ display: none; }

        .shub-card{
          position: relative; overflow: hidden;
          border-radius: 20px;
          background: rgba(8,32,26,0.35); border: 1px solid rgba(225,245,238,0.1);
          transition: border-color .25s ease, box-shadow .25s ease;
          flex: 0 0 calc((100% - 32px) / 3); scroll-snap-align: start;
          user-select: none;
          display: flex; flex-direction: column; gap: 10px;
          padding: 20px 18px 18px;
        }
        .shub-card:hover{ border-color: rgba(93,202,165,0.4); box-shadow: 0 14px 32px -16px rgba(93,202,165,0.35); }
        .shub-card--open{ border-color: var(--c4); box-shadow: 0 18px 40px -18px rgba(93,202,165,0.45); }

        .shub-card__glow{
          position: absolute; top: -50%; right: -20%; width: 200px; height: 200px; border-radius: 50%;
          background: radial-gradient(circle, rgba(93,202,165,0.25) 0%, rgba(93,202,165,0) 70%);
          opacity: 0; transition: opacity .35s ease; pointer-events: none;
        }
        .shub-card:hover .shub-card__glow, .shub-card--open .shub-card__glow{ opacity: 1; }

        .shub-card__top{ display: flex; align-items: center; gap: 8px; }
        .shub-card__index{
          font-family: var(--font-mono); font-size: 10.5px; font-weight: 700; color: var(--c7); letter-spacing: .04em;
          background: var(--paper); padding: 3px 8px; border-radius: 999px;
        }
        .shub-card__tag{
          font-family: var(--font-mono); font-size: 9px; letter-spacing: .05em; text-transform: uppercase;
          color: var(--c7); background: var(--c4); padding: 2px 7px; border-radius: 999px;
        }

        .shub-card__name{ font-family: var(--font-display); font-weight: 600; font-size: 16px; color: var(--c6); line-height: 1.25; margin: 0; }
        .shub-card__tagline{ font-size: 12px; color: var(--c5); line-height: 1.5; margin: 0; }

        .shub-card__counts{
          display: flex; gap: 14px; margin-top: auto; padding-top: 10px;
          border-top: 1px solid rgba(225,245,238,0.1);
          font-family: var(--font-mono); font-size: 10.5px; color: var(--c5);
        }
        .shub-card__counts strong{ color: var(--c4); }

        .shub-body__chips{ display: flex; flex-wrap: wrap; gap: 6px; position: relative; z-index: 1; }
        .shub-body__chip{
          font-size: 11px; color: var(--c6); background: rgba(225,245,238,0.06);
          border: 1px solid rgba(225,245,238,0.12); padding: 5px 9px; border-radius: 999px;
        }
        .shub-body__chip--core{ color: var(--c4); border-color: rgba(93,202,165,0.35); background: rgba(93,202,165,0.1); }
        .shub-body__more{
          align-self: flex-start; font-family: var(--font-mono); font-size: 11px; letter-spacing: .03em;
          color: var(--c7); background: var(--c4); border: none; padding: 7px 14px; border-radius: 999px;
          position: relative; z-index: 1;
        }
        .shub-body__opt-wrap{ overflow: hidden; }

        .shub__dots{ display: flex; justify-content: center; gap: 8px; margin-top: 20px; }
        .shub__dot{
          width: 8px; height: 8px; border-radius: 50%; background: rgba(225,245,238,0.25); border: none;
          padding: 0; transition: background .2s ease, transform .2s ease, width .2s ease;
        }
        .shub__dot--active{ background: var(--c4); width: 22px; border-radius: 999px; }

        @media (max-width: 900px){
          .shub-card{ flex: 0 0 78%; }
          .shub-card__name{ font-size: 15px; }
        }

        @media (prefers-reduced-motion: reduce){
          .shub-card, .shub-card__glow, .shub__dot{ transition: none !important; }
        }
      `}</style>
    </div>
  )
}
