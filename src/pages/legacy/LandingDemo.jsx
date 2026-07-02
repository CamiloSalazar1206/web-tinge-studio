import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/index.jsx'
import { cms } from '../../data/cms.js'
import '../../styles/legacy/landing-demo.css'

// EXAMPLE landing (route /ejemplo) — structure modeled on creativeapes.design
// (dark, minimal, editorial), recolored to the Tinge brand (blue #0055FF on
// black) with Klein type, real home data AND Tinge's real positioning:
// "conectamos grandes marcas con nuevas generaciones" + the CORE method.
// Does NOT touch the existing home.

const CLIENT_LOGOS = [
  '/images/Recurso-3.svg',
  '/images/Recurso-5.svg',
  '/images/Recurso-4.svg',
  '/images/Recurso-1.svg',
  '/images/Recurso-2.svg',
]

const NAV = [
  { label: 'Método', to: '#metodo' },
  { label: 'Trabajo', to: '#trabajo' },
  { label: 'Casos', to: '#casos' },
  { label: 'Contacto', to: '#contacto' },
]

const CORE = [
  { k: 'C', title: 'Criterio', desc: 'Decidimos qué vale la pena crear antes de producir.' },
  { k: 'O', title: 'Operación', desc: 'Alineamos marketing, equipos regionales y stakeholders bajo una misma lógica de marca.' },
  { k: 'R', title: 'Reutilización', desc: 'Transformamos cada activo en el punto de partida del siguiente.' },
  { k: 'E', title: 'Escala', desc: 'Escalamos la marca en canales, formatos y mercados sin perder consistencia.' },
]

const CASES = [
  { brand: 'Warner Channel', desc: 'Rebranding regional y hub centralizado de activos.', metrics: ['−80% tiempos de búsqueda', '+3× velocidad de ejecución'] },
  { brand: 'Bimbo Marinela · Charms IKIS', desc: 'Campaña de lanzamiento regional.', metrics: ['−40% tiempos de producción', '+3× capacidad operativa'] },
  { brand: 'Bimbo Artesano', desc: 'Lanzamiento regional en tres países.', metrics: ['+22 pts Share of Market', 'Premio GBF 2022'] },
]

export default function LandingDemo() {
  const { t } = useI18n()
  const [faq, setFaq] = useState(0)
  const projects = cms.projects.slice(0, 6)

  const services = [
    { title: t('home.service1.title'), desc: t('home.service1.desc'), tags: ['Identidad', 'Naming', 'Guías de marca'] },
    { title: t('home.service2.title'), desc: t('home.service2.desc'), tags: ['2D / 3D', 'Motion', 'Publicidad'] },
    { title: t('home.service3.title'), desc: t('home.service3.desc'), tags: ['Web', 'Apps', 'IA'] },
  ]

  const faqs = [1, 2, 3, 4].map((n) => ({ q: t(`home.faq.q${n}`), a: t(`home.faq.a${n}`) }))

  return (
    <div className="ca">
      {/* TOP BAR */}
      <header className="ca-top">
        <p className="ca-top-tag">Conectamos grandes marcas<br />con nuevas generaciones</p>
        <div className="ca-top-right">
          <span className="ca-top-meta">tingestudio.co</span>
          <span className="ca-square" aria-hidden="true" />
        </div>
      </header>

      {/* GIANT WORDMARK */}
      <section className="ca-hero">
        <h1 className="ca-wordmark">tinge studio<span className="ca-dot">.</span></h1>
      </section>

      {/* NAV + INTRO */}
      <section className="ca-intro">
        <nav className="ca-nav">
          {NAV.map((n) => (
            <a key={n.label} href={n.to} className="ca-nav-link">
              {n.label} <span className="ca-arrow">→</span>
            </a>
          ))}
        </nav>
        <div className="ca-intro-copy">
          <p>
            Las marcas no necesitan producir más: necesitan construir sobre lo que
            ya han creado. Por eso desarrollamos el <strong>Método CORE</strong>, una
            metodología propia que convierte cada campaña en una oportunidad para
            hacer crecer la marca — sin empezar de cero.
          </p>
          <a href="#metodo" className="ca-btn ca-btn-light">Conoce el método</a>
        </div>
      </section>

      {/* CORE METHOD */}
      <div className="ca-divider" id="metodo">
        <span>Nuestro método</span>
        <span className="ca-divider-num">CORE</span>
        <span>Cada campaña construye la siguiente</span>
      </div>
      <section className="ca-core">
        {CORE.map((c) => (
          <div className="ca-core-item" key={c.k}>
            <span className="ca-core-letter">{c.k}</span>
            <div className="ca-core-body">
              <h3 className="ca-core-title">{c.title}</h3>
              <p className="ca-core-desc">{c.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* WORK GRID */}
      <div className="ca-divider" id="trabajo">
        <span>Proyectos destacados</span>
        <span className="ca-divider-num">(06)</span>
        <span>Warner · HBO Max · Bimbo · Danone</span>
      </div>
      <section className="ca-work">
        <div className="ca-work-grid">
          {projects.map((p, i) => (
            <Link to={`/project/${p.slug}`} className="ca-work-item" key={p.slug || i}>
              <div className="ca-work-label">
                <span>{p.name}</span>
                <span className="ca-work-tag">{[p.category, p.year].filter(Boolean).join(' · ')}</span>
              </div>
              <div className="ca-work-media">
                <img src={p.images?.[0]} alt={p.name} loading="lazy" />
              </div>
            </Link>
          ))}
          <Link to="/work" className="ca-work-item ca-work-all">
            <div className="ca-work-label">
              <span>Ver todo</span>
              <span className="ca-work-tag">Archivo completo</span>
            </div>
            <div className="ca-work-media ca-work-all-media">
              <span>{t('ui.viewAllProjects')} →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* CASE STUDIES */}
      <div className="ca-divider" id="casos">
        <span>Resultados con CORE</span>
        <span className="ca-divider-num">(03)</span>
        <span>Impacto medible</span>
      </div>
      <section className="ca-cases">
        {CASES.map((c) => (
          <article className="ca-case" key={c.brand}>
            <h3 className="ca-case-brand">{c.brand}</h3>
            <p className="ca-case-desc">{c.desc}</p>
            <div className="ca-case-metrics">
              {c.metrics.map((m) => <span className="ca-case-metric" key={m}>{m}</span>)}
            </div>
          </article>
        ))}
      </section>

      {/* SERVICES */}
      <div className="ca-divider">
        <span>Qué hacemos</span>
        <span className="ca-divider-num">(03)</span>
        <span>Creatividad + tecnología + IA</span>
      </div>
      <section className="ca-services">
        {services.map((s) => (
          <div className="ca-service" key={s.title}>
            <h2 className="ca-service-title">{s.title}</h2>
            <div className="ca-service-side">
              <p className="ca-service-desc">{s.desc}</p>
              <div className="ca-tags">
                {s.tags.map((tag) => <span className="ca-tag" key={tag}>{tag}</span>)}
              </div>
            </div>
          </div>
        ))}
        <Link to="/contact" className="ca-btn ca-btn-ghost ca-services-cta">Explorar servicios →</Link>
      </section>

      {/* PULL QUOTE */}
      <section className="ca-lab">
        <div className="ca-lab-imgs">
          <img src={projects[3]?.images?.[0]} alt="" className="ca-lab-img a" />
          <img src={projects[1]?.images?.[0]} alt="" className="ca-lab-img b" />
        </div>
        <p className="ca-lab-quote">
          No se trata de producir más contenido. Se trata de construir marcas que
          sigan siendo <span className="ca-accent">relevantes</span> con el paso del tiempo.
        </p>
        <Link to="/work" className="ca-btn ca-btn-light">Ver el trabajo</Link>
      </section>

      {/* CLIENTS */}
      <section className="ca-clients">
        <span className="ca-clients-title">Marcas que confían en nosotros</span>
        <div className="ca-clients-row">
          {CLIENT_LOGOS.map((src) => <img key={src} src={src} alt="" />)}
        </div>
      </section>

      {/* INDEX / STATS */}
      <div className="ca-divider">
        <span>En números</span>
        <span className="ca-divider-num">(03)</span>
        <span>2016 — 2026</span>
      </div>
      <section className="ca-index">
        <div className="ca-index-row"><span className="ca-index-num">120+</span><span className="ca-index-label">{t('home.stats.projects')}</span></div>
        <div className="ca-index-row"><span className="ca-index-num">+10</span><span className="ca-index-label">{t('home.stats.years')}</span></div>
        <div className="ca-index-row"><span className="ca-index-num">25+</span><span className="ca-index-label">marcas globales</span></div>
      </section>

      {/* FAQ */}
      <section className="ca-faq">
        <div className="ca-faq-head">
          <span className="ca-square lg" aria-hidden="true" />
          <h2 className="ca-faq-title">Preguntas<br />frecuentes</h2>
        </div>
        <div className="ca-faq-list">
          {faqs.map((item, i) => {
            const open = faq === i
            return (
              <div className={`ca-faq-item${open ? ' open' : ''}`} key={i}>
                <button type="button" className="ca-faq-q" onClick={() => setFaq(open ? -1 : i)} aria-expanded={open}>
                  <span>{item.q}</span>
                  <span className="ca-faq-sign">{open ? '−' : '+'}</span>
                </button>
                <div className="ca-faq-a" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
                  <div><p>{item.a}</p></div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA + FORM */}
      <section className="ca-cta" id="contacto">
        <h2 className="ca-cta-title">Construyamos marcas<br />que <span className="ca-accent">perduren</span></h2>
        <p className="ca-cta-lead">
          Si tu marca está creciendo, expandiéndose o buscando conectar con nuevas
          generaciones sin empezar de cero en cada campaña, será un gusto conversar.
        </p>
        <form className="ca-form" onSubmit={(e) => e.preventDefault()}>
          <div className="ca-field"><label>Nombre</label><input type="text" placeholder="Tu nombre" /></div>
          <div className="ca-field"><label>Correo</label><input type="email" placeholder="tucorreo@email.com" /></div>
          <div className="ca-field ca-field-full"><label>Cuéntanos sobre tu marca</label><input type="text" placeholder="¿En qué estás trabajando?" /></div>
          <button type="submit" className="ca-btn ca-btn-blue ca-form-submit">{t('ui.contactUs')} →</button>
        </form>
        <div className="ca-cta-meta">
          <span>team@tingestudio.co</span>
          <span>+57 3167224507</span>
          <span>Colombia</span>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ca-foot">
        <div className="ca-foot-word">©2026</div>
      </footer>
    </div>
  )
}
