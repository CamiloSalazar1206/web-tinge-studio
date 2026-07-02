import { Link, useParams } from 'react-router-dom'
import { cms, getProjectBySlug } from '../../data/cms.js'
import { toEmbedUrl } from '../../utils/html.js'
import { projectCases } from '../../data/projectCases.js'
import Reveal from '../../components/v3/Reveal.jsx'
import RcNav from '../../components/v3/RcNav.jsx'
import RcFooter from '../../components/v3/RcFooter.jsx'
import RcMarquee from '../../components/v3/RcMarquee.jsx'
import { CALENDAR_URL, waLink } from '../../lib/contact.js'
import { WhatsAppIcon, CalendarIcon, WaFloat } from '../../components/v3/Cta.jsx'
import '../../styles/v3/base.css'
import '../../styles/v3/case.css'

// Página de caso (preview v3) — dos columnas asimétricas (ref. recent.co):
// piezas grandes a la izquierda, panel de info sticky a la derecha. El panel
// es compacto (cabe en pantalla → sin scroll interno, sin traps de scroll).
// Cada bloque es condicional: funciona con data completa o solo CMS.

// Resuelve un "caso" unificado: primero los curados (data real, con cifras),
// si no, arma uno adaptativo desde el CMS.
function resolveCase(slug) {
  if (projectCases[slug]) return projectCases[slug]
  const p = getProjectBySlug(slug)
  if (!p) return null
  return {
    slug: p.slug,
    tag: p.category || 'Proyecto',
    client: p.name,
    company: p.client,
    category: p.category,
    year: p.year,
    problemaHtml: p.detailsEs || p.details || '',
    logo: '',
    pipeline: [],
    metrics: [],
    visuals: (p.images || []).map((src) => ({ type: 'image', src, alt: p.name })),
    video: p.video || '',
    quotes: [],
  }
}

function MediaItem({ item, client }) {
  if (item.kind === 'embed') {
    return (
      <Reveal className="rc-c2-item rc-c2-embed" y={26}>
        <iframe
          src={item.src}
          title={client}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </Reveal>
    )
  }
  return (
    <Reveal className="rc-c2-item" y={26}>
      {item.type === 'video' ? (
        // poster = primer frame del video (mismo nombre .jpg): nada de gris
        <video src={item.src} poster={item.src.replace(/\.mp4$/, '.jpg')} autoPlay loop muted playsInline />
      ) : (
        <img src={item.src} alt={item.alt || client} loading="lazy" />
      )}
    </Reveal>
  )
}

// Los embeds (Vimeo/YouTube) se reproducen como los demás videos del sitio:
// autoplay, sin sonido y en loop.
function autoplayEmbed(url) {
  if (!url) return url
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtube.com')) {
      const id = u.pathname.split('/').filter(Boolean).pop()
      u.search = `?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&playsinline=1&rel=0&modestbranding=1`
      return u.toString()
    }
    if (u.hostname.includes('vimeo.com')) {
      u.search = '?autoplay=1&muted=1&loop=1&background=1'
      return u.toString()
    }
  } catch { /* url inválida: se devuelve tal cual */ }
  return url
}

// Agrupa el stream respetando la orientación: las horizontales van a todo el
// ancho de la columna; las verticales, de a dos (así no hay que recortarlas).
function buildRows(media) {
  const rows = []
  let pendingV = null
  for (const item of media) {
    if (item.orient === 'v') {
      if (pendingV) {
        rows.push({ kind: 'pair', items: [pendingV, item] })
        pendingV = null
      } else {
        pendingV = item
      }
    } else {
      if (pendingV) {
        rows.push({ kind: 'solo-v', items: [pendingV] })
        pendingV = null
      }
      rows.push({ kind: 'full', items: [item] })
    }
  }
  if (pendingV) rows.push({ kind: 'solo-v', items: [pendingV] })
  return rows
}

const QUOTE_COLORS = ['#A3FF12', '#FF6B9D', '#0055FF']

export default function CaseStudyV3() {
  const { slug } = useParams()
  const caso = resolveCase(slug)

  if (!caso) {
    return (
      <div className="rc rc-proj">
        <RcNav base="/" />
        <section className="rc-proj-missing">
          <h1 className="rc-display">Proyecto no encontrado.</h1>
          <Link to="/proyectos" className="rc-btn-outline">Ver todos los casos</Link>
        </section>
        <RcFooter base="/" />
      </div>
    )
  }

  // Carrusel del final: los demás casos (curados) + cualquier proyecto del
  // CMS que aún no esté curado, sin duplicados.
  const carousel = [
    ...Object.values(projectCases)
      .filter((c) => c.slug !== slug)
      .map((c) => {
        const src = c.cover || (c.visuals || []).find((v) => v.type === 'image')?.src
        return src ? { src, slug: c.slug, alt: c.client } : null
      }),
    ...cms.projects
      .filter((p) => p.slug !== slug && !projectCases[p.slug])
      .map((p) => ({ src: p.images?.[0], slug: p.slug, alt: p.name })),
  ].filter((m) => m.src)

  const metrics = caso.metrics || []
  const quotes = caso.quotes || []
  const story = caso.story || []
  const embed = autoplayEmbed(toEmbedUrl(caso.video || ''))

  // WhatsApp con mensaje personalizado por caso.
  const waText = `Hola Tinge 👋 Vi el caso de ${caso.client} y me gustaría conversar con ustedes.`

  // Todas las piezas en un solo stream. Regla: los videos van primero,
  // incluido el embed de Vimeo/YouTube.
  const media = [
    ...(embed ? [{ kind: 'embed', src: embed }] : []),
    ...(caso.visuals || []),
  ]

  return (
    <div className="rc rc-proj">
      <RcNav base="/" />

      {/* Dos columnas: piezas (grande) | info sticky (chica) */}
      <div className="rc-c2">
        <div className="rc-c2-media">
          {buildRows(media).map((row, i) =>
            row.kind === 'pair' ? (
              <div className="rc-c2-pair" key={`r${i}`}>
                {row.items.map((item, j) => (
                  <MediaItem item={item} client={caso.client} key={j} />
                ))}
              </div>
            ) : row.kind === 'solo-v' ? (
              <div className="rc-c2-pair rc-c2-solo" key={`r${i}`}>
                <MediaItem item={row.items[0]} client={caso.client} />
              </div>
            ) : (
              <MediaItem item={row.items[0]} client={caso.client} key={`r${i}`} />
            )
          )}
        </div>

        <aside className="rc-c2-side">
          <Reveal className="rc-c2-panel" delay={0.08}>
            <div className="rc-c2-tagrow">
              <span className="rc-eyebrow">{caso.tag}</span>
              {caso.logo && (
                caso.logo.endsWith('.mp4') ? (
                  <span className="rc-c2-logo">
                    <video src={caso.logo} autoPlay muted playsInline loop />
                  </span>
                ) : (
                  <span className="rc-c2-logo is-img">
                    <img src={caso.logo} alt={caso.client} />
                  </span>
                )
              )}
            </div>
            <h1 className="rc-c2-title">{caso.client}</h1>

            {/* Apertura editorial */}
            {caso.problema && <p className="rc-c2-lede">{caso.problema}</p>}
            {caso.problemaHtml && (
              <div className="rc-c2-lede" dangerouslySetInnerHTML={{ __html: caso.problemaHtml }} />
            )}

            {/* Historia en bloques escaneables: subtítulo en tinta + cuerpo */}
            {story.map((s) => (
              <div className="rc-c2-block" key={s.label}>
                <h2 className="rc-c2-h">{s.label}</h2>
                <p className="rc-c2-body">{s.text}</p>
              </div>
            ))}

            {caso.concepto && <p className="rc-c2-concept">“{caso.concepto}”</p>}

            {(caso.serviciosList?.length > 0 || caso.servicios) && (
              <div className="rc-c2-block">
                <h2 className="rc-c2-h">Servicios</h2>
                {caso.serviciosList?.length > 0 ? (
                  <ul className="rc-c2-servlist">
                    {caso.serviciosList.map((sv) => <li key={sv}>{sv}</li>)}
                  </ul>
                ) : (
                  <p className="rc-c2-body rc-c2-body-sm">{caso.servicios}</p>
                )}
              </div>
            )}

            {metrics.length > 0 && (
              <div className="rc-c2-resultado">
                <span className="rc-eyebrow">El resultado</span>
                <div className="rc-c2-metrics">
                  {metrics.map((m) => (
                    <div className="rc-c2-metric" key={m.label}>
                      <div className="rc-c2-metric-num" style={{ color: m.color || 'var(--blue)' }}>{m.num}</div>
                      <div className="rc-c2-metric-label">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rc-c2-cta">
              <a href={waLink(waText)} target="_blank" rel="noreferrer" className="rc-btn-wa">
                <WhatsAppIcon /> WhatsApp
              </a>
              <a href={CALENDAR_URL} target="_blank" rel="noreferrer" className="rc-btn-cal">
                <CalendarIcon /> Agendar reunión
              </a>
            </div>
          </Reveal>
        </aside>
      </div>

      {/* Quotes */}
      {quotes.length > 0 && (
        <div className="rc-case-quotes">
          <div className={`rc-bento-quotes q${Math.min(quotes.length, 3)}`}>
            {quotes.map((q, i) => {
              const accent = QUOTE_COLORS[i % QUOTE_COLORS.length]
              return (
              <Reveal className="rc-bento-quote" key={i} delay={i * 0.06}>
                <span className="rc-bento-quote-bar" style={{ background: accent }} aria-hidden="true" />
                <div>
                  <span className="rc-bento-quote-mark" style={{ color: accent }} aria-hidden="true">“</span>
                  <p className="rc-bento-quote-text">{q.text}</p>
                </div>
                <div className="rc-bento-quote-foot">
                  <div className="rc-bento-quote-name">{q.role}</div>
                  <div className="rc-bento-quote-co">{q.company}</div>
                </div>
              </Reveal>
              )
            })}
          </div>
        </div>
      )}

      {/* Más proyectos — carrusel */}
      <section className="rc-proj-more">
        <div className="rc-proj-more-head">
          <span className="rc-eyebrow">Más proyectos</span>
          <Link to="/proyectos" className="rc-btn-outline">Ver todos los casos</Link>
        </div>
      </section>
      <RcMarquee items={carousel} ariaLabel="Más proyectos" />

      <RcFooter base="/" />

      <WaFloat text={waText} />
    </div>
  )
}
