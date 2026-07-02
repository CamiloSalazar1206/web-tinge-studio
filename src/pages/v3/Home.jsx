import { Link } from 'react-router-dom'
import { cms } from '../../data/cms.js'
import Reveal from '../../components/v3/Reveal.jsx'
import CountUp from '../../components/v3/CountUp.jsx'
import RcNav from '../../components/v3/RcNav.jsx'
import RcFooter from '../../components/v3/RcFooter.jsx'
import RcMarquee from '../../components/v3/RcMarquee.jsx'
import '../../styles/v3/base.css'
import '../../styles/v3/home.css'

// EXAMPLE landing v3 (route /ejemplo-v3) — premium editorial narrative.
// Hero dice el resultado; el resto explica por qué; CORE es la respuesta (no el
// protagonista); casos prueban la tesis; el cierre vuelve a la filosofía.
// Dark, azul #0055FF con moderación, tipografía Klein, Framer Motion (blur-in).

const CORE = [
  { k: 'C', title: 'Criterio', desc: 'Decidir qué vale la pena crear.' },
  { k: 'O', title: 'Operación', desc: 'Alinear equipos bajo una misma lógica.' },
  { k: 'R', title: 'Reutilización', desc: 'Convertir cada activo en el punto de partida del siguiente.' },
  { k: 'E', title: 'Escala', desc: 'Crecer sin perder consistencia.' },
]

const RESULTS = [
  {
    brand: 'Warner Channel',
    desc: 'Rebranding regional y hub centralizado de assets.',
    metrics: [
      { prefix: '−', to: 80, suffix: '%', label: 'tiempos de búsqueda', color: '#A3FF12' },
      { prefix: '+', to: 3, suffix: '×', label: 'velocidad de ejecución', color: '#FF6B9D' },
    ],
  },
  {
    brand: 'Bimbo Marinela · Charms IKIS',
    desc: 'Campaña de lanzamiento.',
    metrics: [
      { prefix: '−', to: 40, suffix: '%', label: 'tiempos de producción', color: '#0055FF' },
      { prefix: '+', to: 3, suffix: '×', label: 'capacidad operativa', color: '#C084FC' },
    ],
  },
  {
    brand: 'Bimbo Artesano',
    desc: 'Lanzamiento regional en tres países.',
    metrics: [
      { prefix: '+', to: 22, suffix: ' pts', label: 'Share of Market', color: '#A3FF12' },
      { text: 'Premio GBF 2022', color: '#FF6B9D' },
    ],
  },
]

export default function HomeV3() {
  const projects = cms.projects
  const grid = projects.slice(0, 3) // casos destacados (Artesano, Danet, ESPN)

  // Marquee: SOLO proyectos NO destacados (los 3 de arriba no se repiten aquí) y
  // sin la tarjeta azul de servicios. Main + 2ª imagen de cada uno, intercaladas.
  const otras = [5, 3, 6, 4].map((i) => projects[i]).filter(Boolean)
  const marquee = [
    ...otras.map((p) => ({ src: p.images?.[0], slug: p.slug })),
    ...otras.map((p) => ({ src: p.images?.[1], slug: p.slug })),
  ].filter((m) => m.src)

  return (
    <div className="rc">
      {/* NAV */}
      <RcNav />

      {/* S1 · HERO — el resultado */}
      <section className="rc-hero">
        <video className="rc-hero-img" src="/videos/warner-id-preview.mp4" poster="/videos/warner-id-preview.jpg" autoPlay muted loop playsInline preload="auto" />
        <div className="rc-hero-veil" />
        <div className="rc-hero-content">
          <Reveal as="h1" className="rc-hero-title rc-poster" delay={0.15} y={26}>
            Conectamos grandes marcas<br />con nuevas generaciones.
          </Reveal>
        </div>
        <div className="rc-scroll">↓</div>
      </section>

      {/* S2 · EL MÉTODO — 2 columnas: tesis (izq) + CORE (der) */}
      <section className="rc-method" id="metodo">
        <div className="rc-method-grid">
          <Reveal className="rc-method-head">
            <span className="rc-eyebrow">El método</span>
            <h2 className="rc-method-thesis">
              Las grandes marcas no se construyen una sola vez.<br />Se construyen continuamente.
            </h2>
            <p className="rc-method-intro">
              CORE es la metodología que hace que cada decisión fortalezca la siguiente.
            </p>
          </Reveal>

          <div className="rc-method-core">
            <span className="rc-core-label">CORE</span>
            <div className="rc-core-list">
              {CORE.map((c, i) => (
                <Reveal className="rc-core-row" key={c.k} delay={i * 0.08}>
                  <span className="rc-core-node" aria-hidden="true" />
                  <span className="rc-core-k">{c.k}</span>
                  <div className="rc-core-row-text">
                    <h3 className="rc-core-title">{c.title}</h3>
                    <p className="rc-core-desc">{c.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* S5 · CASOS (grid + marquee) */}
      <section className="rc-projects" id="casos">
        <Reveal className="rc-projects-head">
          <div>
            <span className="rc-eyebrow">Casos</span>
            <h2 className="rc-display">Marcas que siguen creciendo.</h2>
          </div>
          <Link to="/work" className="rc-btn-outline">Ver todos los proyectos</Link>
        </Reveal>
        <div className="rc-cards rc-cards-6">
          {grid.map((p, i) => (
            <Reveal key={p.slug || i} delay={(i % 3) * 0.08}>
              <Link to={`/proyecto-v3/${p.slug}`} className="rc-card">
                <img src={p.images?.[0]} alt={p.name} loading="lazy" />
                <div className="rc-card-info">
                  <span className="rc-card-cat">{p.category || 'Brand Identity'}</span>
                  <span className="rc-card-title">{p.name}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MARQUEE — carrusel de proyectos */}
      <RcMarquee items={marquee} ariaLabel="Trabajo y proyectos" />

      {/* S6 · RESULTADOS (métricas con count-up) */}
      <section className="rc-results" id="resultados">
        <Reveal className="rc-results-head">
          <span className="rc-eyebrow">Resultados</span>
          <h2 className="rc-display">Cuando todo empieza a sumar.</h2>
        </Reveal>
        <div className="rc-results-grid">
          {RESULTS.map((r, i) => (
            <Reveal className="rc-result" key={r.brand} delay={i * 0.08}>
              <h3 className="rc-result-brand">{r.brand}</h3>
              <p className="rc-result-desc">{r.desc}</p>
              <div className="rc-result-metrics">
                {r.metrics.map((m, j) => (
                  <div className="rc-result-metric" key={j}>
                    <span className="rc-result-num" style={{ color: m.color || 'var(--blue)' }}>
                      {m.text ? m.text : <CountUp prefix={m.prefix} to={m.to} suffix={m.suffix} />}
                    </span>
                    {m.label && <span className="rc-result-lbl">{m.label}</span>}
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SECCIÓN FINAL — cierre + CTA en una sola (simple, humano, inclusivo) */}
      <section className="rc-final" id="contacto">
        <div className="rc-rings" aria-hidden="true"><span /><span /><span /></div>
        <Reveal className="rc-final-inner">
          <h2 className="rc-display rc-final-title">Toda marca tiene algo por construir.</h2>
          <p className="rc-final-text">Hagámoslo juntos.</p>
          <div className="rc-final-actions">
            <Link to="/contact" className="rc-btn-blue">Hablemos →</Link>
            <a href="mailto:team@tingestudio.co" className="rc-final-mail">team@tingestudio.co</a>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <RcFooter />
    </div>
  )
}
