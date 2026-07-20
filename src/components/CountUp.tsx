import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  to: number
  duration?: number
}

export default function CountUp({ to, duration = 1.4 }: CountUpProps) {
  const [value, setValue] = useState(0)
  const [landed, setLanded] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setValue(to); return }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const step = (now: number) => {
          const progress = Math.min((now - start) / (duration * 1000), 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setValue(Math.round(eased * to))
          if (progress < 1) {
            requestAnimationFrame(step)
          } else {
            // Pequeño "aterrizaje": el número hace un punch de escala
            // justo al llegar a su valor final.
            setLanded(true)
            setTimeout(() => setLanded(false), 260)
          }
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.4 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [to, duration])

  return (
    <span ref={ref} className={`countup ${landed ? 'countup--landed' : ''}`}>
      {value.toLocaleString('es-CO')}
      <style>{`
        .countup{ display: inline-block; transform-origin: center; }
        .countup--landed{ animation: countupPunch .26s ease-out; }
        @keyframes countupPunch{
          0%{ transform: scale(1); }
          40%{ transform: scale(1.12); }
          100%{ transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce){
          .countup--landed{ animation: none; }
        }
      `}</style>
    </span>
  )
}
