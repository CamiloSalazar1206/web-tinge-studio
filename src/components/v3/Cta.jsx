import { waLink } from '../../lib/contact.js'

// Iconos y burbuja de WhatsApp compartidos (landings + páginas de caso).
export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8Zm-3.1 4c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.2s.9 2.6 1 2.7c.1.2 1.8 2.8 4.4 3.9 2.2.9 2.6.7 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.2-.7.1l-1 1.2c-.2.2-.3.2-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5L9.5 8.2c-.2-.4-.4-.4-.6-.4Z" />
    </svg>
  )
}

export function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <rect x="3.2" y="4.8" width="17.6" height="16" rx="2.5" />
      <path d="M3.2 9.6h17.6M7.8 2.8v3.4M16.2 2.8v3.4" />
      <path d="M8 13.5h2.2M8 17h2.2M13.8 13.5H16M13.8 17H16" strokeWidth="1.6" />
    </svg>
  )
}

export function WaFloat({ text }) {
  return (
    <a
      href={waLink(text)}
      target="_blank"
      rel="noreferrer"
      className="rc-wa-float"
      aria-label="Escríbenos por WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  )
}
