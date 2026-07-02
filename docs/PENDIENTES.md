# Pendientes y próximos pasos

Actualizado: julio 2026

## En curso / inmediato

- [ ] **Pixel de Meta** — instalarlo en `index.html` (igual que el gtag de GA4,
  en el `<head>`). Lo coloca Jonathan. Al probarlo, verificar eventos en el
  Events Manager de Meta.
- [x] **Landings segmentadas para pauta** — `/entretenimiento` y
  `/consumo-masivo`: casos del segmento + método CORE + form con campo
  `origen` para saber de qué landing llega cada lead.

## Contenido de casos

- [ ] **Confirmar la cifra de Artesano**: el deck dice "+1.6 USD/YEAR
  incremental sales" (¿es +1.6M USD/año?). Al confirmar, agregarla a las
  métricas del caso en `src/data/projectCases.js`.
- [ ] **Cifras y quotes de los casos restantes**: Danet, ESPN, F1 Fox (×2),
  Invasión Marvel y Sabatón hoy no tienen métricas ni testimonios. Formato:
  2 a 4 cifras (número + etiqueta + color de la paleta) y quotes opcionales.
- [ ] **Casos nuevos del deck sin página**: HBO Max CCXP Brasil (+20K
  asistentes, 3 días de ejecución) y B-Nutrition Bimbo México. Faltan las
  piezas (imágenes/videos) para montarlos.

## Técnico

- [ ] **Comprimir videos para producción**: los previews quedaron en ~12MB
  (720p con faststart). Con ffmpeg se pueden bajar a ~4MB con mejor control
  de bitrate. Los originales están en el Desktop de Jonathan y en el icp-hub.
- [ ] **git-lfs para el equipo**: el repo usa LFS (`public/media|images|fonts`).
  GitHub Desktop lo trae incluido; en terminal hay que instalarlo.
- [ ] **Spam**: si se cuela algo pese al honeypot + trampa de tiempo, activar
  Akismet en Netlify (Forms → Spam filtering, sin tocar código).
- [ ] **Rutas de respaldo**: cuando el sitio nuevo esté validado, decidir si
  se eliminan `/home-old`, `/work-old`, `/contact-old`, `/project-old/:slug`
  y las pruebas `/ejemplo`, `/ejemplo-v2`.

## Ideas a futuro

- [ ] Página "Nosotros" con el diseño v3 (la de about se eliminó).
- [ ] Versión EN del sitio v3 (el toggle de idioma era del sitio Webflow).
- [ ] Aplicar tesis "Las grandes marcas nunca dejan de construirse" como
  territorio de posicionamiento (ver docs/home-storytelling.md).
