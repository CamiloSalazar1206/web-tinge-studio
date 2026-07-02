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
// CTAs primarios: WhatsApp (con mensaje precargado por segmento) y agenda.
const CALENDAR_URL = 'https://calendar.app.google/9Yp4LodhEX57QxDQ8'
const waLink = (text) => `https://wa.me/573167224507?text=${encodeURIComponent(text)}`

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8Zm-3.1 4c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.2s.9 2.6 1 2.7c.1.2 1.8 2.8 4.4 3.9 2.2.9 2.6.7 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.2-.7.1l-1 1.2c-.2.2-.3.2-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5L9.5 8.2c-.2-.4-.4-.4-.6-.4Z" />
    </svg>
  )
}
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <rect x="3.2" y="4.8" width="17.6" height="16" rx="2.5" />
      <path d="M3.2 9.6h17.6M7.8 2.8v3.4M16.2 2.8v3.4" />
      <path d="M8 13.5h2.2M8 17h2.2M13.8 13.5H16M13.8 17H16" strokeWidth="1.6" />
    </svg>
  )
}

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
    resultsTitle: 'Resultados reales.',
    results: [
      {
        brand: 'Warner Channel TV',
        slug: 'warner-channel',
        desc: 'El brief pedía un restyling. Entregamos el concepto “Donde la historia crece contigo”, una identidad en movimiento y el hub de assets que hoy opera toda Latinoamérica.',
        metrics: [
          { num: '–80%', label: 'búsqueda de assets', color: '#A3FF12' },
          { num: '+3×', label: 'producción on-air', color: '#FF6B9D' },
          { num: '100%', label: 'adopción en la primera semana', color: '#0055FF' },
        ],
      },
      {
        brand: 'The Walt Disney Company',
        slug: 'invasion-marvel',
        desc: 'Tres programas, tres sistemas gráficos: Invasión Marvel, Sabatón y F1 Fox Premium. La fuerza de cada franquicia traducida a piezas que operan el canal día a día.',
        metrics: [
          { num: '3', label: 'sistemas gráficos al aire', color: '#0055FF' },
          { text: '2020 – 2023', label: 'trabajando juntos', color: '#C084FC' },
        ],
      },
      {
        brand: 'ESPN · Estudio.la',
        slug: 'espn-scrum-mundial-2023',
        desc: 'La cobertura del Mundial de Rugby con identidad propia: dirección de arte y animación para el aire de ESPN, junto a Estudio.la.',
        metrics: [
          { text: 'Mundial de Rugby 2023', label: 'evento en vivo para toda la región', color: '#A3FF12' },
        ],
      },
    ],
    quotes: projectCases['warner-channel'].quotes,
    whatsappText: 'Hola Tinge 👋 Trabajo con una marca de entretenimiento y me gustaría conversar con ustedes.',
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
    resultsTitle: 'Resultados reales.',
    results: [
      {
        brand: 'Bimbo · Vital',
        slug: 'bimbo',
        desc: 'Un sistema que combina IA con curaduría humana sobre las producciones que ya existían, con el producto y la experiencia en el centro.',
        metrics: [
          { num: '–50%', label: 'tiempo de producción', color: '#A3FF12' },
          { num: '+40%', label: 'reutilización de contenido', color: '#FF6B9D' },
          { num: '2×', label: 'piezas en la mitad del tiempo', color: '#0055FF' },
        ],
      },
      {
        brand: 'Bimbo · Artesano',
        slug: 'artesano-eleva-tus-sentidos',
        desc: 'El concepto “Eleva tus sentidos” desplegado en Colombia, Ecuador y Centroamérica, alineado a los objetivos de negocio de la marca.',
        metrics: [
          { num: '+22 pts', label: 'Value SOM', color: '#0055FF' },
          { text: 'Premio GBF 2022', label: 'reconocimiento de la categoría', color: '#C084FC' },
        ],
      },
      {
        brand: 'Danone · Danet Shake',
        slug: 'danet-shake',
        desc: '“Supera las distancias”: en plena pandemia, un comercial donde cada compra lleva un mensaje personalizado que acerca a la gente.',
        metrics: [
          { num: '3', label: 'influencers top de la juventud española', color: '#A3FF12' },
          { text: 'Animación 3D', label: 'publicidad dinámica para Danone España', color: '#FF6B9D' },
        ],
      },
    ],
    quotes: projectCases.bimbo.quotes,
    whatsappText: 'Hola Tinge 👋 Trabajo con una marca de consumo masivo y me gustaría conversar con ustedes.',
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
          <Reveal className="rc-lp-ctas" delay={0.32}>
            <a href={waLink(cfg.whatsappText)} target="_blank" rel="noreferrer" className="rc-btn-wa">
              <WhatsAppIcon /> WhatsApp
            </a>
            <a href={CALENDAR_URL} target="_blank" rel="noreferrer" className="rc-btn-cal">
              <CalendarIcon /> Agendar una reunión
            </a>
          </Reveal>
        </div>
      </section>

      {/* RESULTADOS por caso: qué se hizo + cifra real, nada de humo */}
      <section className="rc-results rc-lp-results">
        <Reveal className="rc-results-head">
          <span className="rc-eyebrow">Resultados</span>
          <h2 className="rc-display">{cfg.resultsTitle}</h2>
        </Reveal>
        <div className="rc-results-grid">
          {cfg.results.map((r, i) => (
            <Reveal className="rc-result" key={r.brand} delay={i * 0.08}>
              <h3 className="rc-result-brand">{r.brand}</h3>
              <p className="rc-result-desc">{r.desc}</p>
              <div className="rc-result-metrics">
                {r.metrics.map((m, j) => (
                  <div className="rc-result-metric" key={j}>
                    <span className={`rc-result-num${m.text ? ' rc-result-num-sm' : ''}`} style={{ color: m.color || 'var(--blue)' }}>
                      {m.text || m.num}
                    </span>
                    {m.label && <span className="rc-result-lbl">{m.label}</span>}
                  </div>
                ))}
              </div>
              {r.slug && <Link to={`/proyecto/${r.slug}`} className="rc-result-link">Ver el caso →</Link>}
            </Reveal>
          ))}
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
            <div className="rc-lp-quick">
              <a href={waLink(cfg.whatsappText)} target="_blank" rel="noreferrer" className="rc-btn-wa">
                <WhatsAppIcon /> Escríbenos por WhatsApp
              </a>
              <a href={CALENDAR_URL} target="_blank" rel="noreferrer" className="rc-btn-cal">
                <CalendarIcon /> Agendar una reunión
              </a>
            </div>
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

      {/* WhatsApp flotante: siempre a un toque */}
      <a
        href={waLink(cfg.whatsappText)}
        target="_blank"
        rel="noreferrer"
        className="rc-wa-float"
        aria-label="Escríbenos por WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </div>
  )
}
