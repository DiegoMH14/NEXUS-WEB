import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 640)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.button
            className="backtotop"
            onClick={scrollTop}
            aria-label="Volver arriba"
            initial={{ opacity: 0, y: 12, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            whileHover="hover"
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              variants={{ hover: { y: [0, -5, 0] } }}
              transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'inline-block' }}
            >
              ↑
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        .backtotop{
          position: fixed; right: 22px; bottom: 22px; z-index: 150;
          width: 46px; height: 46px; border-radius: 50%;
          background: var(--c4); color: var(--c7); border: none;
          font-size: 18px; font-weight: 700;
          box-shadow: 0 12px 28px -10px rgba(4,52,44,0.6);
          display: flex; align-items: center; justify-content: center;
          transition: background .2s ease;
        }
        .backtotop:hover{ background: var(--c6); }
        @media (max-width: 640px){
          .backtotop{ right: 16px; bottom: 16px; width: 42px; height: 42px; }
        }
      `}</style>
    </>
  )
}
