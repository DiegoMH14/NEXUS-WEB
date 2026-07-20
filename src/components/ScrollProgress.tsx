// ============================================================
// NEXUS — Barra fina de progreso de scroll, fija justo debajo
// del borde superior. Se llena de 0 a 100% según cuánto se ha
// recorrido la página.
// ============================================================
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.2 })

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
      <style>{`
        .scroll-progress{
          position: fixed; top: 0; left: 0; right: 0; height: 2.5px; z-index: 300;
          background: linear-gradient(90deg, var(--c3), var(--c4));
          transform-origin: left;
        }
      `}</style>
    </>
  )
}
