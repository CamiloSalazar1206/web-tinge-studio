import { useState } from 'react'
import Reveal from '../../components/v3/Reveal.jsx'
import RcNav from '../../components/v3/RcNav.jsx'
import RcFooter from '../../components/v3/RcFooter.jsx'
import '../../styles/v3/base.css'
import '../../styles/v3/contact.css'

// Contacto (v3) — misma voz que la home: editorial, oscuro, azul de marca.
// El form envía a Netlify Forms (schema declarado en el form oculto de
// index.html, name="Contact").
export default function ContactV3() {
  const [status, setStatus] = useState('idle') // idle | sending | ok | error

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.target)
    data.append('form-name', 'Contact')
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      })
      setStatus(res.ok ? 'ok' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="rc">
      <RcNav base="/" />

      <section className="rc-contact">
        <Reveal className="rc-contact-intro">
          <span className="rc-eyebrow">Contacto</span>
          <h1 className="rc-contact-title rc-poster">Hablemos.</h1>
          <p className="rc-contact-text">
            Cuéntanos en qué está tu marca y te respondemos en menos de 48 horas.
          </p>
          <div className="rc-contact-meta">
            <a href="mailto:team@tingestudio.co">team@tingestudio.co</a>
            <a href="tel:+573167224507">+57 316 722 4507</a>
            <span>Colombia</span>
          </div>
        </Reveal>

        <Reveal className="rc-contact-formwrap" delay={0.1}>
          {status === 'ok' ? (
            <div className="rc-contact-ok">
              <h2 className="rc-display">Recibido.</h2>
              <p className="rc-contact-text">Gracias por escribirnos. Te contactamos muy pronto.</p>
            </div>
          ) : (
            <form className="rc-contact-form" name="Contact" method="POST" data-netlify="true" onSubmit={onSubmit}>
              <input type="hidden" name="form-name" value="Contact" />
              <label>
                <span>Nombre</span>
                <input type="text" name="nombre-completo" placeholder="Tu nombre" required />
              </label>
              <label>
                <span>Correo</span>
                <input type="email" name="correo" placeholder="tu@empresa.com" required />
              </label>
              <label>
                <span>Teléfono</span>
                <input type="tel" name="telefono" placeholder="+57 300 000 0000" />
              </label>
              <label>
                <span>Cuéntanos de tu marca</span>
                <textarea name="mensaje" rows="4" placeholder="Qué necesitan y para cuándo" />
              </label>
              <button type="submit" className="rc-btn-blue" disabled={status === 'sending'}>
                {status === 'sending' ? 'Enviando…' : 'Enviar →'}
              </button>
              {status === 'error' && (
                <p className="rc-contact-error">No se pudo enviar. Escríbenos a team@tingestudio.co</p>
              )}
            </form>
          )}
        </Reveal>
      </section>

      <RcFooter base="/" />
    </div>
  )
}
