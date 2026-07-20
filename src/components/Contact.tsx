import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG, emailjsIsConfigured } from '../config/emailjs'
import { sectores } from '../data/sectors'

type Status = 'idle' | 'sending' | 'ok' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    const form = e.currentTarget
    const data = new FormData(form)

    if (!emailjsIsConfigured) {
      // Aún no se han configurado las credenciales reales de EmailJS.
      console.warn('[NEXUS] Configura VITE_EMAILJS_* en tu archivo .env para activar el envío real.')
      await new Promise(r => setTimeout(r, 700))
      setStatus('ok')
      form.reset()
      return
    }

    try {
      // Se usa el SDK oficial (@emailjs/browser) en vez de golpear la API REST
      // directo con fetch: EmailJS bloquea las llamadas "crudas" por defecto
      // porque no puede verificar que vienen de un navegador real.
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: data.get('nombre'),
          from_email: data.get('correo'),
          company: data.get('empresa'),
          sector: data.get('sector'),
          message: data.get('mensaje'),
        },
        { publicKey: EMAILJS_CONFIG.publicKey }
      )

      setStatus('ok')
      form.reset()
    } catch (err) {
      console.error('[NEXUS] Error enviando el formulario:', err)
      setStatus('error')
      setErrorMsg('No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos directamente.')
    }
  }

  return (
    <section id="contacto" className="contact section-dark section-pad">
      <div className="container contact__grid">
        <div>
          <p className="eyebrow contact__eyebrow">Hablemos de tu negocio</p>
          <h2 className="contact__title">
            Cuéntanos tu sector.
            <br />
            Te mostramos cómo se vería tu NEXUS.
          </h2>
          <p className="contact__sub">
            Sin compromiso. Respondemos en menos de 24 horas hábiles con una demo armada
            para el sector que nos cuentes.
          </p>
        </div>

        <motion.form
          className="contact__form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="contact__row">
            <label>
              Nombre
              <input type="text" name="nombre" required placeholder="Tu nombre completo" />
            </label>
            <label>
              Correo electrónico
              <input type="email" name="correo" required placeholder="tu@empresa.co" />
            </label>
          </div>

          <div className="contact__row">
            <label>
              Empresa (opcional)
              <input type="text" name="empresa" placeholder="Nombre de tu negocio" />
            </label>
            <label>
              Sector
              <select name="sector" defaultValue="">
                <option value="" disabled>Elige el más cercano</option>
                {sectores.flatMap(s => s.modulos).map(m => (
                  <option key={m.id} value={m.nombre}>{m.nombre}</option>
                ))}
                <option value="otro">Otro / no estoy seguro</option>
              </select>
            </label>
          </div>

          <label>
            Cuéntanos qué necesitas
            <textarea name="mensaje" required rows={4} placeholder="Ej: tengo una cadena de talleres y necesito controlar inventario y garantías…" />
          </label>

          <button type="submit" className="btn btn--solid contact__submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
          </button>

          <div aria-live="polite" className="contact__status">
            {status === 'ok' && <span className="contact__ok">✓ Mensaje enviado. Te escribiremos muy pronto.</span>}
            {status === 'error' && <span className="contact__error">{errorMsg}</span>}
          </div>
        </motion.form>
      </div>

      <style>{`
        .contact__grid{ display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 60px; align-items: start; }
        .contact__eyebrow{ color: var(--c5); }
        .contact__title{ margin-top: 16px; font-size: clamp(26px, 3.2vw, 38px); color: var(--c6); line-height: 1.22; }
        .contact__sub{ margin-top: 20px; color: var(--c5); font-size: 15px; line-height: 1.6; max-width: 420px; }
        .contact__form{
          background: rgba(225,245,238,0.03); border: 1px solid rgba(225,245,238,0.1);
          border-radius: 20px; padding: 32px; display: flex; flex-direction: column; gap: 18px;
        }
        .contact__row{ display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
        label{
          display: flex; flex-direction: column; gap: 8px; font-family: var(--font-mono);
          font-size: 11.5px; letter-spacing: .04em; text-transform: uppercase; color: var(--c5);
        }
        input, textarea, select{
          font-family: var(--font-body); font-size: 14.5px; color: var(--c6);
          background: rgba(4,52,44,0.5); border: 1px solid rgba(225,245,238,0.16);
          border-radius: 10px; padding: 12px 14px; outline: none;
          transition: border-color .15s ease;
        }
        input::placeholder, textarea::placeholder{ color: rgba(225,245,238,0.35); }
        input:focus, textarea:focus, select:focus{ border-color: var(--c4); }
        textarea{ resize: vertical; }
        select{ color-scheme: dark; }

        .contact__submit{ align-self: flex-start; border: none; margin-top: 6px; }
        .contact__submit:disabled{ opacity: .6; cursor: progress; }
        .contact__status{ min-height: 20px; font-size: 13.5px; }
        .contact__ok{ color: var(--c4); }
        .contact__error{ color: #ef8a8a; }

        @media (max-width: 900px){
          .contact__grid{ grid-template-columns: 1fr; gap: 36px; }
          .contact__row{ grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
