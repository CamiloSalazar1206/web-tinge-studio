import { Link } from 'react-router-dom'
import { projectCases } from '../../data/projectCases.js'
import Reveal from '../../components/v3/Reveal.jsx'
import RcNav from '../../components/v3/RcNav.jsx'
import RcFooter from '../../components/v3/RcFooter.jsx'
import '../../styles/v3/base.css'
import '../../styles/v3/projects.css'

// Proyectos (v3) — el portafolio completo: todos los casos curados en la
// grilla de tarjetas de la home, con el mismo diseño.
const ORDER = [
  'warner-channel',
  'bimbo',
  'artesano-eleva-tus-sentidos',
  'danet-shake',
  'espn-scrum-mundial-2023',
  'invasion-marvel',
  'sabaton',
  'f1-fox-premium',
  'f1-fox-premium-2',
]

const cardImage = (c) => (c.visuals || []).find((v) => v.type === 'image')?.src

export default function ProjectsV3() {
  const cases = ORDER.map((slug) => projectCases[slug]).filter(Boolean)

  return (
    <div className="rc">
      <RcNav base="/" />

      <section className="rc-plist">
        <Reveal className="rc-plist-head">
          <span className="rc-eyebrow">Proyectos</span>
          <h1 className="rc-display rc-plist-title">Marcas que siguen creciendo.</h1>
          <p className="rc-plist-sub">
            {cases.length} proyectos para marcas que conectan con nuevas generaciones.
          </p>
        </Reveal>

        <div className="rc-cards rc-plist-grid">
          {cases.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 0.08}>
              <Link to={`/proyecto/${c.slug}`} className="rc-card">
                <img src={cardImage(c)} alt={c.client} loading={i > 5 ? 'lazy' : 'eager'} />
                <div className="rc-card-info">
                  <span className="rc-card-cat">{c.tag}</span>
                  <span className="rc-card-title">{c.client}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="rc-plist-cta">
          <p className="rc-plist-sub">¿Tu marca es la que sigue?</p>
          <Link to="/contact" className="rc-btn-blue">Hablemos →</Link>
        </Reveal>
      </section>

      <RcFooter base="/" />
    </div>
  )
}
