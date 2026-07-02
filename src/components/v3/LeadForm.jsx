import { useEffect, useRef, useState } from 'react'

// Form de leads (Netlify Forms, name="Contact") con anti-spam: honeypot +
// trampa de tiempo. `origen` marca de qué landing llega el lead.
export default function LeadForm({ origen = 'contacto' }) {
  const [status, setStatus] = useState('idle') // idle | sending | ok | error
  const openedAt = useRef(0)
  useEffect(() => { openedAt.current = Date.now() }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    // Anti-spam: honeypot lleno o envío en <3s = bot. Se simula éxito.
    if (data.get('bot-field') || Date.now() - openedAt.current < 3000) {
      setStatus('ok')
      return
    }
    setStatus('sending')
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

  if (status === 'ok') {
    return (
      <div className="rc-contact-ok">
        <h2 className="rc-display">Recibido.</h2>
        <p className="rc-contact-text">Gracias por escribirnos. Te contactamos muy pronto.</p>
      </div>
    )
  }

  return (
    <form className="rc-contact-form" name="Contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit}>
      <input type="hidden" name="form-name" value="Contact" />
      <input type="hidden" name="origen" value={origen} />
      {/* honeypot: invisible para humanos, irresistible para bots */}
      <p className="rc-hp" aria-hidden="true">
        <label>
          No llenar este campo
          <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
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
  )
}
