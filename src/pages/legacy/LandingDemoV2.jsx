import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../../i18n/index.jsx'
import { cms } from '../../data/cms.js'
import '../../styles/legacy/landing-demo-v2.css'

// EXAMPLE landing v2 (route /ejemplo-v2) — structure modeled on
// athleticsnyc.com (editorial, dark, light-serif display, eyebrow labels,
// lettered A/B/C/D specialties, 3D-tilted work cards, video hero), recolored
// to the Tinge brand (blue #0055FF on black) with Tinge's real positioning
// and the CORE method. Separate from /ejemplo and the real home.

const SPECIALTIES = [
  { k: 'A', label: 'Estrategia de Marca' },
  { k: 'B', label: 'Producción de Video' },
  { k: 'C', label: 'Desarrollo & Producto' },
  { k: 'D', label: 'Método CORE · IA' },
]

const CORE = [
  { k: 'C', title: 'Criterio', desc: 'Decidimos qué vale la pena crear antes de producir.' },
  { k: 'O', title: 'Operación', desc: 'Alineamos marketing, equipos regionales y stakeholders bajo una misma lógica de marca.' },
  { k: 'R', title: 'Reutilización', desc: 'Cada activo se convierte en el punto de partida del siguiente.' },
  { k: 'E', title: 'Escala', desc: 'Escalamos en canales, formatos y mercados sin perder consistencia.' },
]

const CASES = [
  { brand: 'Warner Channel', tag: 'Rebranding regional', metric: '−80% tiempos de búsqueda · +3× velocidad', color: '#0055ff' },
  { brand: 'Bimbo Marinela', tag: 'Charms IKIS — Lanzamiento', metric: '−40% producción · +3× capacidad', color: '#f5ffc9' },
  { brand: 'Bimbo Artesano', tag: 'Lanzamiento en 3 países', metric: '+22 pts Share of Market · Premio GBF 2022', color: '#e1daf7' },
]

const CLIENT_LOGOS = [
  '/images/Recurso-3.svg',
  '/images/Recurso-5.svg',
  '/images/Recurso-4.svg',
  '/images/Recurso-1.svg',
  '/images/Recurso-2.svg',
]

export default function LandingDemoV2() {
  const { t } = useI18n()
  const [menu, setMenu] = useState(false)
  const projects = cms.projects.slice(0, 6)

  return (
    <div className="av">
      {/* NAV */}
      <header className="av-nav">
        <span className="av-logo">Tinge<span className="av-logo-dot">.</span></span>
        <nav className={`av-nav-links${menu ? ' open' : ''}`}>
          <a href="#trabajo">Trabajo</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#metodo">Método</a>
          <a href="#casos">Casos</a>
          <Link to="/contact">Contacto</Link>
        </nav>
        <button className="av-nav-toggle" onClick={() => setMenu((v) => !v)}>Menú</button>
      </header>

      {/* HERO — cinematic still */}
      <section className="av-hero">
        <div className="av-hero-media">
          <img src={projects[5]?.images?.[0] || projects[2]?.images?.[0]} alt="" />
        </div>
        <div className="av-hero-veil" />
        <button className="av-reel">● Ver reel</button>
        <h1 className="av-hero-title av-serif">
          Tinge es un estudio de <em>marca</em> que conecta grandes marcas con nuevas generaciones.
        </h1>
      </section>

      {/* WHAT WE DO */}
      <section className="av-block" id="nosotros">
        <p className="av-eyebrow">Qué hacemos</p>
        <div className="av-block-grid">
          <h2 className="av-serif av-h2">
            Ayudamos a las marcas a diseñar su lugar en el mundo —
            y a mantenerlo en el tiempo.
          </h2>
          <div className="av-block-copy">
            <p>
              Las marcas llegan con ambición. La convertimos en una visión afilada
              y en las herramientas para llevarla a la vida en un mundo ruidoso.
            </p>
            <p>
              Creemos que las marcas no necesitan producir más: necesitan construir
              sobre lo que ya han creado. Cada campaña debe fortalecer la siguiente.
            </p>
          </div>
        </div>
      </section>

      {/* SPECIALTIES */}
      <section className="av-block">
        <p className="av-eyebrow">Especialidades</p>
        <ul className="av-spec">
          {SPECIALTIES.map((s) => (
            <li className="av-spec-row" key={s.k}>
              <span className="av-spec-k">{s.k}</span>
              <span className="av-serif av-spec-label">{s.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* HOW WE DO IT — CORE */}
      <section className="av-block" id="metodo">
        <p className="av-eyebrow">Cómo lo hacemos · Método CORE</p>
        <div className="av-block-grid">
          <h2 className="av-serif av-h2">Convertimos cada campaña en la base de la siguiente.</h2>
          <div className="av-block-copy">
            <p>
              CORE es nuestra metodología propia. En lugar de empezar de cero en
              cada proyecto, hacemos que la marca crezca de forma acumulativa —
              con criterio, operación, reutilización y escala.
            </p>
          </div>
        </div>
        <div className="av-core">
          {CORE.map((c) => (
            <div className="av-core-item" key={c.k}>
              <span className="av-core-k">{c.k}</span>
              <h3 className="av-core-title">{c.title}</h3>
              <p className="av-core-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WORK — 3D tilted cards */}
      <section className="av-work" id="trabajo">
        <p className="av-eyebrow av-work-eyebrow">Nuestro trabajo</p>
        <div className="av-work-list">
          {projects.map((p, i) => (
            <Link
              to={`/project/${p.slug}`}
              className={`av-work-item ${i % 2 ? 'right' : 'left'}`}
              key={p.slug || i}
            >
              <div className="av-work-card">
                <img src={p.images?.[0]} alt={p.name} loading="lazy" />
              </div>
              <div className="av-work-meta">
                <span className="av-work-name av-serif">{p.name}</span>
                <span className="av-work-tag">{[p.client, p.category].filter(Boolean).join(' — ')}</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="av-center">
          <Link to="/work" className="av-pill">Ver todo el trabajo</Link>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="av-block av-principles">
        <p className="av-eyebrow">Los principios detrás de nuestro trabajo</p>
        <h2 className="av-serif av-principles-title">
          Original.<br />Con propósito.<br />Que perdura.
        </h2>
        <div className="av-block-copy av-principles-copy">
          <p>
            Las marcas valiosas construyen significado más profundo. Integramos
            estrategia, diseño, tecnología e IA para producir activos de alta
            fidelidad, on-brand — sin sacrificar el detalle.
          </p>
          <Link to="/about" className="av-link">Conoce nuestro enfoque →</Link>
        </div>
      </section>

      {/* CLIENTS */}
      <section className="av-clients">
        <p className="av-eyebrow">Marcas que confían en nosotros</p>
        <div className="av-clients-row">
          {CLIENT_LOGOS.map((src) => <img key={src} src={src} alt="" />)}
        </div>
      </section>

      {/* CASES / RESULTS */}
      <section className="av-cases" id="casos">
        <p className="av-eyebrow">Resultados con CORE</p>
        <div className="av-cases-grid">
          {CASES.map((c) => (
            <article className="av-case" key={c.brand}>
              <div className="av-case-thumb" style={{ background: c.color }} />
              <div className="av-case-body">
                <span className="av-case-tag">{c.tag}</span>
                <h3 className="av-serif av-case-brand">{c.brand}</h3>
                <p className="av-case-metric">{c.metric}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="av-foot">
        <div className="av-foot-cta">
          <h2 className="av-serif av-foot-title">Construyamos algo que perdure.</h2>
          <Link to="/contact" className="av-pill av-pill-blue">{t('ui.contactUs')}</Link>
        </div>
        <div className="av-foot-grid">
          <div className="av-foot-col">
            <a href="#trabajo">Trabajo</a><a href="#nosotros">Nosotros</a><a href="#metodo">Método</a>
          </div>
          <div className="av-foot-col">
            <a href="https://www.instagram.com/tingestudio/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://co.linkedin.com/company/tingestudio" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
          <div className="av-foot-col">
            <span>team@tingestudio.co</span><span>+57 3167224507</span><span>Colombia</span>
          </div>
        </div>
        <div className="av-foot-word">Tinge<span className="av-logo-dot">.</span></div>
      </footer>
    </div>
  )
}
