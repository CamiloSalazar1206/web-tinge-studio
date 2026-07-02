# Estructura del proyecto

Actualizado: julio 2026

## Rutas

| Ruta | Página | Estado |
|---|---|---|
| `/` | **Home (v3)** — el sitio nuevo | producción |
| `/proyecto/:slug` | **Página de caso (v3)** | producción |
| `/contact` | **Contacto (v3)** — form a Netlify Forms | producción |
| `/ejemplo-v3`, `/proyecto-v3/:slug` | alias de las anteriores (links viejos) | alias |
| `/proyectos` (= `/work`) | **Proyectos (v3)** — portafolio completo | producción |
| `/project/:slug` | redirect → `/proyecto/:slug` | redirect |
| `/home-old`, `/work-old`, `/contact-old`, `/project-old/:slug` | versiones Webflow (respaldo) | backup |
| `/ejemplo`, `/ejemplo-v2` | pruebas de diseño viejas | legacy |

> Depurado (jul 2026): about, blog, pricing, productos y checkout se
> eliminaron (rutas + páginas + html crudo). Solo quedan los respaldos de
> home/work/contact/project.

## `src/`

```
src/
├── pages/
│   ├── v3/                  ← EL SITIO NUEVO (en preview)
│   │   ├── Home.jsx         home v3: hero video, método CORE, casos, resultados, cierre
│   │   └── CaseStudy.jsx    página de caso: piezas + panel sticky, quotes, carrusel
│   ├── legacy/              pruebas v1/v2 (referencia histórica, borrar cuando se decida)
│   └── *.jsx                páginas Webflow actuales (HomePage, WorkPage, etc.)
├── components/
│   ├── v3/                  componentes del sitio nuevo
│   │   ├── RcNav.jsx        nav pill (logo tinge_.png)
│   │   ├── RcFooter.jsx     footer azul
│   │   ├── RcMarquee.jsx    carrusel infinito de proyectos
│   │   ├── Reveal.jsx       reveal blur-in al scroll (Framer Motion)
│   │   └── CountUp.jsx      cifras animadas 0→N
│   ├── WebflowPage.jsx      render de páginas Webflow
│   └── LanguageToggle.jsx   toggle idioma (oculto en rutas v3)
├── styles/
│   ├── v3/
│   │   ├── base.css         tokens (--blue, --muted…), tipografía Klein, nav, botones, footer, marquee
│   │   ├── home.css         secciones de la home
│   │   └── case.css         página de caso + quotes
│   └── legacy/              css de las pruebas v1/v2
├── data/
│   ├── projectCases.js      ★ LA DATA DE LOS CASOS: textos, cifras (con color),
│   │                          servicios, videos/imágenes (orient: 'v' = va en par), quotes
│   ├── cms.js               normalizador del export de Webflow
│   └── *.json               export del CMS de Webflow
└── utils/                   helpers (toEmbedUrl, i18n DOM)
```

## `public/`

```
public/
├── videos/      videos de casos (720p, faststart) + su poster .jpg (primer frame)
├── casos/       piezas de casos curados (Warner, Bimbo)
├── media/       imágenes del CMS Webflow (wf-*.png)
├── images/      logos (tinge_.png = principal) y assets del sitio Webflow
├── fonts/       Klein (Condensed Extrabold / Text / Extralight)
└── css/         css Webflow + tinge-brand.css (reskin global)
```

## `docs/`

- `PITCH_DECK_CREDENCIALES.pdf` — deck con la info real de cada caso (fuente de textos/cifras)
- `referencias/` — screenshots de sitios de referencia (recent.co, athletics, creativeapes)
- `home-storytelling.md` — brief de narrativa de la home

## Convenciones de los casos (`projectCases.js`)

- **Videos siempre primero** (incluye embeds de Vimeo/YouTube, que van con autoplay+mute+loop).
- `orient: 'v'` en una pieza = vertical o cuadrada → se muestra de a dos (sin recortes).
- Videos locales: comprimir a 720p H.264 **con faststart** y generar poster `.jpg` con el mismo nombre.
- Cifras: 2–4 por caso con `color` de la paleta (#A3FF12 verde, #FF6B9D magenta, #0055FF azul, #C084FC violeta). Azul es siempre el color de marca; los tonos solo van en datos y quotes.
- Textos: arco *El reto → La solución → El resultado (cifras)*, una frase por bloque, sin guiones largos.
