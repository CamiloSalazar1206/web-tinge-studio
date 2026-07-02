import { Link } from 'react-router-dom'
import { projectCases } from '../../data/projectCases.js'
import Reveal from '../../components/v3/Reveal.jsx'
import RcNav from '../../components/v3/RcNav.jsx'
import RcFooter from '../../components/v3/RcFooter.jsx'
import LeadForm from '../../components/v3/LeadForm.jsx'
import '../../styles/v3/base.css'
import '../../styles/v3/home.css'
import '../../styles/v3/contact.css'
import '../../styles/v3/landing.css'

// Landings segmentadas para pauta (Meta): casos del segmento + método CORE +
// form de conversión con `origen`. Una config por industria.
const CORE = [
  { k: 'C', title: 'Criterio', desc: 'Decidir qué vale la pena crear.' },
  { k: 'O', title: 'Operación', desc: 'Alinear equipos bajo una misma lógica.' },
  { k: 'R', title: 'Reutilización', desc: 'Convertir cada activo en el punto de partida del siguiente.' },
  { k: 'E', title: 'Escala', desc: 'Crecer sin perder consistencia.' },
]

const SEGMENTS = {
  entretenimiento: {
    origen: 'landing-entretenimiento',
    eyebrow: 'Para canales, estudios y franquicias',
    title: <>Conectamos entretenimiento<br />con nuevas generaciones.</>,
    sub: 'Rebranding, identidad en movimiento y sistemas de producción para Warner, Disney, ESPN y Fox.',
    heroVideo: '/videos/wbtv-rebrand-bento.mp4',
    heroPoster: '/videos/wbtv-rebrand-bento.jpg',
    cases: ['warner-channel', 'espn-scrum-mundial-2023', 'invasion-marvel', 'sabaton', 'f1-fox-premium', 'f1-fox-premium-2'],
    resultsTitle: 'Lo que pasó con Warner Channel TV.',
    results: [
      { num: '–80%', label: 'Búsqueda de assets', color: '#A3FF12' },
      { num: '3x', label: 'Producción on-air', color: '#FF6B9D' },
      { num: '100%', label: 'Adopción semana 1', color: '#0055FF' },
      { num: '0', label: 'Inconsistencias', color: '#C084FC' },
    ],
    quotes: projectCases['warner-channel'].quotes,
    ctaTitle: 'Tu marca ya vive en la memoria de la gente.',
    ctaText: 'Hagamos que crezca con las nuevas generaciones.',
  },
  'consumo-masivo': {
    origen: 'landing-consumo-masivo',
    eyebrow: 'Para marcas de consumo masivo',
    title: <>Conectamos marcas de consumo<br />con nuevas generaciones.</>,
    sub: 'Campañas y sistemas de producción con IA para Bimbo y Danone: más contenido, en menos tiempo, sin perder la marca.',
    heroImage: '/casos/bimbo-cover.jpg',
    cases: ['bimbo', 'artesano-eleva-tus-sentidos', 'danet-shake'],
    resultsTitle: 'Lo que pasó con Bimbo.',
    results: [
      { num: '–50%', label: 'Tiempo de producción', color: '#A3FF12' },
      { num: '+22 pts', label: 'Value SOM (Artesano)', color: '#FF6B9D' },
      { num: '40+', label: 'Submarcas gestionadas', color: '#0055FF' },
      { num: '100%', label: 'Estándar profesional', color: '#C084FC' },
    ],
    quotes: projectCases.bimbo.quotes,
    ctaTitle: 'Tu marca necesita más contenido cada mes.',
    ctaText: 'Hagamos que cada pieza construya marca.',
  },
}

const cardImage = (c) => c.cover || (c.visuals || []).find((v) => v.type === 'image')?.src

export default function SegmentLanding({ segment }) {
  const cfg = SEGMENTS[segment]
  const cases = cfg.cases.map((slug) => projectCases[slug]).filter(Boolean)

  return (
    <div className="rc">
      <RcNav base="/" />

      {/* HERO segmentado */}
      <section className="rc-hero rc-lp-hero">
        {cfg.heroVideo ? (
          <video className="rc-hero-img" src={cfg.heroVideo} poster={cfg.heroPoster} autoPlay muted loop playsInline preload="auto" />
        ) : (
          <img className="rc-hero-img" src={cfg.heroImage} alt="" />
        )}
        <div className="rc-hero-veil" />
        <div className="rc-hero-content">
          <Reveal as="p" className="rc-eyebrow rc-lp-eyebrow" delay={0.05}>{cfg.eyebrow}</Reveal>
          <Reveal as="h1" className="rc-lp-title rc-poster" delay={0.15} y={26}>{cfg.title}</Reveal>
          <Reveal as="p" className="rc-hero-sub" delay={0.25}>{cfg.sub}</Reveal>
          <Reveal delay={0.32}>
            <a href="#hablemos" className="rc-btn-blue">Hablemos →</a>
          </Reveal>
        </div>
      </section>

      {/* CASOS del segmento */}
      <section className="rc-projects" id="casos">
        <Reveal className="rc-projects-head">
          <div>
            <span className="rc-eyebrow">Casos</span>
            <h2 className="rc-display">Marcas que ya lo hicieron.</h2>
          </div>
        </Reveal>
        <div className="rc-cards">
          {cases.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 0.08}>
              <Link to={`/proyecto/${c.slug}`} className="rc-card">
                <img src={cardImage(c)} alt={c.client} loading={i > 2 ? 'lazy' : 'eager'} />
                <div className="rc-card-info">
                  <span className="rc-card-cat">{c.tag}</span>
                  <span className="rc-card-title">{c.client}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* RESULTADOS del segmento */}
      <section className="rc-results">
        <Reveal className="rc-results-head">
          <span className="rc-eyebrow">Resultados</span>
          <h2 className="rc-display">{cfg.resultsTitle}</h2>
        </Reveal>
        <div className="rc-lp-metrics">
          {cfg.results.map((m) => (
            <Reveal className="rc-lp-metric" key={m.label}>
              <div className="rc-lp-metric-num" style={{ color: m.color }}>{m.num}</div>
              <div className="rc-lp-metric-label">{m.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EL PROCESO — método CORE */}
      <section className="rc-method" id="metodo">
        <div className="rc-method-grid">
          <Reveal className="rc-method-head">
            <span className="rc-eyebrow">El proceso</span>
            <h2 className="rc-method-thesis">
              Las grandes marcas no se construyen una sola vez.<br />Se construyen continuamente.
            </h2>
            <p className="rc-method-intro">
              CORE es la metodología que hace que cada decisión fortalezca la siguiente.
            </p>
          </Reveal>
          <div>
            <span className="rc-core-label">CORE</span>
            <div className="rc-core-list">
              {CORE.map((c, i) => (
                <Reveal className="rc-core-row" key={c.k} delay={i * 0.08}>
                  <span className="rc-core-node" aria-hidden="true" />
                  <span className="rc-core-k">{c.k}</span>
                  <div>
                    <h3 className="rc-core-title">{c.title}</h3>
                    <p className="rc-core-desc">{c.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUOTES del segmento */}
      {cfg.quotes?.length > 0 && (
        <div className="rc-case-quotes">
          <div className={`rc-bento-quotes q${Math.min(cfg.quotes.length, 3)}`}>
            {cfg.quotes.map((q, i) => (
              <Reveal className="rc-bento-quote rc-lp-quote" key={i} delay={i * 0.06}>
                <div>
                  <span className="rc-bento-quote-mark" aria-hidden="true">“</span>
                  <p className="rc-bento-quote-text">{q.text}</p>
                </div>
                <div className="rc-bento-quote-foot">
                  <div className="rc-bento-quote-name">{q.name}</div>
                  <div className="rc-bento-quote-role">{q.role}</div>
                  <div className="rc-bento-quote-co">{q.company}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* CONVERSIÓN — form inline */}
      <section className="rc-lp-form" id="hablemos">
        <div className="rc-lp-form-grid">
          <Reveal className="rc-lp-form-intro">
            <span className="rc-eyebrow">Hablemos</span>
            <h2 className="rc-display">{cfg.ctaTitle}</h2>
            <p className="rc-contact-text">{cfg.ctaText}</p>
            <div className="rc-contact-meta">
              <a href="mailto:team@tingestudio.co">team@tingestudio.co</a>
              <a href="tel:+573167224507">+57 316 722 4507</a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <LeadForm origen={cfg.origen} />
          </Reveal>
        </div>
      </section>

      <RcFooter base="/" />
    </div>
  )
}
