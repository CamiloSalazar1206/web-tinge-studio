import { Link } from 'react-router-dom'

// Nav compartido del preview v3 (landing + página de proyecto).
// `base` antepone la ruta para que los anchors de sección funcionen también
// desde otras páginas (p.ej. base="/ejemplo-v3" en la página de proyecto).
export default function RcNav({ base = '' }) {
  return (
    <header className="rc-nav-wrap">
      <div className="rc-nav">
        <Link to="/ejemplo-v3" className="rc-logo-link" aria-label="Tinge — inicio">
          <img className="rc-logo" src="/images/tinge_.png" alt="Tinge" width="514" height="153" />
        </Link>
        <nav className="rc-nav-links">
          <a href={`${base}#metodo`}>Método</a>
          <a href={`${base}#casos`}>Casos</a>
          <a href={`${base}#resultados`}>Resultados</a>
          <Link to="/contact">Contacto</Link>
        </nav>
        <Link to="/contact" className="rc-nav-cta">Hablemos →</Link>
      </div>
    </header>
  )
}
