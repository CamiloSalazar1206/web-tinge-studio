import { Link } from 'react-router-dom'

// Footer compartido del preview v3 (landing + página de proyecto).
// `base` antepone la ruta para los anchors de sección desde otras páginas.
export default function RcFooter({ base = '' }) {
  return (
    <footer className="rc-foot">
      <div className="rc-foot-brand">
        <img className="rc-foot-logo" src="/images/tinge_.png" alt="Tinge" width="514" height="153" />
        <p className="rc-foot-tagline">Conectamos grandes marcas con nuevas generaciones.</p>
      </div>
      <div className="rc-foot-grid">
        <div className="rc-foot-col">
          <span className="rc-foot-h">Estudio</span>
          <a href={`${base}#metodo`}>Método CORE</a>
          <a href={`${base}#casos`}>Casos</a>
          <a href={`${base}#resultados`}>Resultados</a>
        </div>
        <div className="rc-foot-col">
          <span className="rc-foot-h">Social</span>
          <a href="https://www.instagram.com/tingestudio/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://co.linkedin.com/company/tingestudio" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
        <div className="rc-foot-col">
          <span className="rc-foot-h">Contacto</span>
          <a href="mailto:team@tingestudio.co">team@tingestudio.co</a>
          <span>+57 3167224507</span>
          <span>Colombia</span>
        </div>
      </div>
      <div className="rc-foot-legal">
        <span>©2026 Tinge Studio</span>
        <span>Todos los derechos reservados</span>
      </div>
    </footer>
  )
}
