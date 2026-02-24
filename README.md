# Tinge Studio — Migración Webflow → React (Vite)

Este proyecto corresponde a la **migración completa de un sitio desarrollado en Webflow hacia una arquitectura SPA basada en React + Vite**.

El objetivo principal fue:

* Mantener **100% del diseño visual original**
* Preservar **animaciones e interacciones de Webflow**
* Convertir el sitio en una **Single Page Application**
* Desacoplar completamente el CMS de Webflow
* Implementar sistema de traducción ES/EN
* Servir todos los assets de manera local (sin depender del CDN de Webflow)

---

# Estado actual del proyecto

El proyecto actualmente:

* Funciona como SPA con React + Vite
* Tiene rutas dinámicas (proyectos, blog y productos)
* Usa CMS local (CSV → JSON → Normalización)
* Sirve todos los assets de forma local
* Implementa selector de idioma ES/EN
* Re-ejecuta animaciones Webflow correctamente
* Incluye fallback para evitar elementos ocultos por `opacity: 0`

No depende de Webflow en producción.

---

# 1. Estructura del proyecto

```
public/
  media/                 # Assets descargados desde Webflow (imágenes, videos, etc.)
  css/ js/ images/ ...   # Archivos exportados del proyecto Webflow

src/
  components/
    WebflowPage.jsx      # Motor que renderiza HTML Webflow dentro de React
    LanguageToggle.jsx   # Selector de idioma personalizado

  data/
    raw/                 # CSV originales exportados de Webflow
    projects.json
    blog.json
    products.json
    cms.js               # Normalización y helpers del CMS

  i18n/
    en.json
    es.json
    index.jsx            # Provider + hook useTranslation()

  pages/
    raw/                 # HTML originales exportados de Webflow
    HomePage.jsx
    WorkPage.jsx
    BlogPage.jsx
    BlogDetailPage.jsx
    PricingPage.jsx
    ProjectDetailPage.jsx
    ProductDetailPage.jsx
    AboutPage.jsx
    ContactPage.jsx

  utils/
    html.js              # Helpers: fechas, safe HTML, embeds
    i18nDom.js           # Traducción dinámica sobre HTML Webflow

  App.jsx
  main.jsx
```

---

# 2. Proceso de Migración desde Webflow

## 2.1 Exportación desde Webflow

Se exportó el proyecto completo incluyendo:

* HTML
* CSS
* JS
* Fonts
* Assets estáticos
* CMS como CSV:

  * Projects
  * Blog Posts
  * Post Categories
  * Products
  * Categories

---

## 2.2 Reorganización en React

### Assets

Todos los recursos estáticos fueron movidos a:

```
public/
```

Esto permite que Vite los sirva directamente sin procesamiento.

---

### HTML

Los HTML exportados fueron movidos a:

```
src/pages/raw/
```

Estos archivos sirven como plantilla base para cada página.

---

### index.html de Vite

Se creó un `index.html` limpio que:

* Carga los CSS originales de Webflow
* Inyecta WebFont
* Carga jQuery (si era requerido)
* Carga `webflow.js`
* Monta el root de React

---

## 2.3 CMS Local

Proceso:

1. CSV exportados guardados en `src/data/raw/`
2. Conversión manual o automática a JSON
3. Normalización de estructuras en `cms.js`

`cms.js` se encarga de:

* Normalizar fechas
* Generar slugs
* Relacionar categorías
* Resolver imágenes locales

Esto permite que React consuma los datos como si fuera un CMS real.

---

## 2.4 Sistema de Rutas

Se implementó React Router con rutas dinámicas:

| Ruta             | Descripción          |
| ---------------- | -------------------- |
| `/`              | Home                 |
| `/work`          | Lista de proyectos   |
| `/project/:slug` | Detalle de proyecto  |
| `/blog-1`        | Lista de blog        |
| `/blog/:slug`    | Detalle de blog      |
| `/product/:slug` | Detalle de producto  |
| `/pricing`       | Listado de productos |
| `/about`         | Sobre nosotros       |
| `/contact`       | Contacto             |

Esto convierte el sitio en SPA real sin recargas.

---

# 3. Renderizado de HTML Webflow dentro de React

El núcleo técnico del proyecto es:

## `WebflowPage.jsx`

Este componente:

1. Recibe el HTML exportado como string
2. Lo parsea usando `DOMParser`
3. Reemplaza:

   * Contenido CMS
   * Textos dinámicos
   * Traducciones
4. Convierte `<a>` normales en navegación SPA
5. Ejecuta nuevamente:

   * `Webflow.ready()`
   * `Webflow.require('ix2').init()`
6. Aplica fallback para mostrar elementos que Webflow dejó con `opacity: 0`

Esto permite:

* No reescribir el diseño en JSX
* Conservar animaciones originales
* Mantener fidelidad visual total

---

# 4. Sistema de Idiomas (ES / EN)

Estructura:

```
src/i18n/es.json
src/i18n/en.json
```

El sistema funciona así:

1. Provider global en `i18n/index.jsx`
2. Hook `useTranslation()`
3. `LanguageToggle.jsx` cambia idioma
4. `i18nDom.js` traduce nodos HTML exportados

Si falta una traducción:

1. Añadir key en `es.json` y `en.json`
2. Mapear en la función transform correspondiente

No requiere librerías externas pesadas.

---

# 5. Manejo de Assets (CDN Webflow → Local)

Todos los recursos que antes apuntaban a:

* `uploads-ssl.webflow.com`
* `cdn.prod.website-files.com`

Fueron:

* Descargados manualmente
* Reubicados en `public/media/`
* Reemplazados en HTML y JSON por rutas locales

Ejemplo:

```
https://uploads-ssl.webflow.com/xxx/image.png
```

→

```
/media/image.png
```

Videos externos (YouTube / Vimeo) se mantienen embebidos.

---

# 6. Scripts disponibles

```bash
npm install     # Instalar dependencias
npm run dev     # Servidor local
npm run build   # Build producción
npm run preview # Preview del build
```

---

# 7. Mejoras futuras recomendadas

* Migrar HTML crítico a JSX (para mejor control y performance)
* Reducir uso de `dangerouslySetInnerHTML`
* Implementar CMS Headless real (Strapi, Contentful, API propia)
* Implementar SSR (Next.js) si se requiere SEO más fuerte
* Optimizar imágenes con compresión moderna (WebP / AVIF)

---

# 8. Consideraciones Técnicas Importantes

* El proyecto ya no depende de Webflow
* El CMS es completamente local
* Las animaciones funcionan sin el entorno Webflow
* El diseño es prácticamente idéntico al original

---

# Flujo para agregar nuevas páginas o secciones

1. Exportar HTML desde Webflow (o crear JSX)
2. Agregar el archivo en `pages/raw`
3. Crear la página React correspondiente
4. Mapear textos en `i18n`
5. Conectar datos en `cms.js`
6. Registrar la ruta en `App.jsx`

