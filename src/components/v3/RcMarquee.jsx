import { Link } from 'react-router-dom'

// Carrusel infinito de proyectos (landing + página de proyecto).
// items: [{ src, slug, alt }]
export default function RcMarquee({ items = [], ariaLabel = 'Proyectos' }) {
  const list = items.filter((it) => it && it.src)
  if (list.length === 0) return null
  return (
    <section className="rc-marquee-section" aria-label={ariaLabel}>
      <div className="rc-marquee">
        <div className="rc-marquee-track">
          {[...list, ...list].map((it, i) => (
            <Link
              to={`/proyecto/${it.slug}`}
              className="rc-marquee-item"
              key={`m${i}`}
              aria-hidden={i >= list.length}
              tabIndex={i >= list.length ? -1 : undefined}
            >
              <img src={it.src} alt={it.alt || ''} loading="lazy" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
