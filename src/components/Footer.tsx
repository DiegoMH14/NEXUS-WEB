import { motion } from 'framer-motion'
import NexusLogo from './NexusLogo'

const COLUMNS = [
  {
    title: 'Producto',
    links: [
      { href: '#sectores', label: 'Sectores' },
      { href: '#como-funciona', label: 'Cómo funciona' },
      { href: '#faq', label: 'Preguntas frecuentes' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { href: '#contacto', label: 'Hablemos' },
      { href: '#top', label: 'Volver al inicio' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <motion.div
          className="footer__brand-col"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <a href="#top" className="footer__brand">
            <NexusLogo size={30} />
            <span>NEXUS</span>
          </a>
          <p className="footer__blurb">
            Plataforma SaaS multi-tenant hecha para el mercado colombiano: un solo código base,
            un sector distinto para cada cliente.
          </p>
        </motion.div>

        <div className="footer__cols">
          {COLUMNS.map((col, i) => (
            <motion.div
              key={col.title}
              className="footer__col"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <span className="footer__col-title">{col.title}</span>
              <ul>
                {col.links.map(l => (
                  <li key={l.href}><a href={l.href}>{l.label}</a></li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="container footer__bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="footer__copy">© {new Date().getFullYear()} NEXUS DMH. Todos los derechos reservados.</p>
        <p className="footer__note">Hecho en Colombia.</p>
      </motion.div>

      <style>{`
        .footer{ background: #021F1A; color: var(--c5); padding: 64px 0 0; }
        .footer__top{
          display: flex; justify-content: space-between; gap: 48px; flex-wrap: wrap;
          padding-bottom: 48px;
        }
        .footer__brand-col{ max-width: 340px; }
        .footer__brand{
          display: flex; align-items: center; gap: 10px;
          font-family: var(--font-display); font-weight: 700; color: var(--c6); font-size: 17px;
        }
        .footer__blurb{ margin-top: 16px; font-size: 13.5px; line-height: 1.6; color: var(--c5); }

        .footer__cols{ display: flex; gap: 56px; flex-wrap: wrap; }
        .footer__col-title{
          display: block; font-family: var(--font-mono); font-size: 11px; letter-spacing: .1em;
          text-transform: uppercase; color: var(--c4); margin-bottom: 16px;
        }
        .footer__col ul{ display: flex; flex-direction: column; gap: 10px; }
        .footer__col a{ font-size: 13.5px; color: var(--c5); transition: color .15s ease; }
        .footer__col a:hover{ color: var(--c6); }

        .footer__bottom{
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;
          padding: 22px 0; border-top: 1px solid rgba(225,245,238,0.08);
        }
        .footer__copy, .footer__note{ font-family: var(--font-mono); font-size: 11px; color: var(--c5); opacity: .85; }

        @media (max-width: 640px){
          .footer__top{ flex-direction: column; gap: 32px; }
          .footer__cols{ gap: 32px; }
        }
      `}</style>
    </footer>
  )
}
