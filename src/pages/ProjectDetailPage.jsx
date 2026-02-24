import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import WebflowPage from '../components/WebflowPage.jsx'
import template from './raw/detail_project.html?raw'
import notFoundTemplate from './raw/404.html?raw'
import { cms, getProjectBySlug } from '../data/cms.js'
import { escapeHtml, toEmbedUrl } from '../utils/html.js'
import { useI18n } from '../i18n/index.jsx'
import { applyFooterTranslations, applyNavTranslations } from '../utils/i18nDom.js'

const buildProjectItem = (project) => `
  <div role="listitem" class="w-dyn-item">
    <div class="work-wrapper">
      <img alt="${escapeHtml(project.name)}" loading="eager" src="${project.images[0] || ''}" class="work-photo">
      <a href="/project/${project.slug}" class="project-circle w-inline-block">
        <div class="view-project-main">
          <div class="scroll-down eye" data-animation-type="lottie" data-src="documents/Animation---1700576146214.json" data-loop="1" data-direction="1" data-autoplay="1" data-is-ix2-target="0" data-renderer="svg" data-default-duration="2.2333333333333334" data-duration="0"></div>
        </div>
      </a>
      <div class="text-rotator-wrapper">
        <div class="text-rotator-content">
          <h3 class="text-rotator">${escapeHtml(project.name)}</h3>
          <div class="start-icon"></div>
        </div>
        <div class="text-rotator-content">
          <h3 class="text-rotator">${escapeHtml(project.name)}</h3>
          <div class="start-icon"></div>
        </div>
        <div class="text-rotator-content">
          <h3 class="text-rotator">${escapeHtml(project.name)}</h3>
          <div class="start-icon"></div>
        </div>
      </div>
    </div>
  </div>
`

const reveal = (el) => {
  if (!el) return
  el.classList.remove('w-dyn-bind-empty')
  el.style.opacity = '1'
  if (el.style.transform) {
    el.style.transform = 'none'
  }
}

const createTransform = (project, t) => (doc) => {
  if (!project) return
  doc.title = project.name

  applyNavTranslations(doc, t)
  applyFooterTranslations(doc, t)

  const title = doc.querySelector('h1.display-1')
  if (title) {
    title.textContent = project.name
    reveal(title)
  }

  const heroImage = doc.querySelector('.rounded-image')
  if (heroImage && project.images[0]) {
    heroImage.setAttribute('src', project.images[0])
    reveal(heroImage)
  }

  const infoValues = doc.querySelectorAll('.info-content p.w-dyn-bind-empty')
  if (infoValues[0]) {
    infoValues[0].textContent = project.client
    reveal(infoValues[0])
  }
  if (infoValues[1]) {
    infoValues[1].textContent = project.category
    reveal(infoValues[1])
  }
  if (infoValues[2]) {
    infoValues[2].textContent = project.year
    reveal(infoValues[2])
  }

  const video = doc.querySelector('.video-proyect')
  if (video && project.video) {
    const embedUrl = toEmbedUrl(project.video)
    video.style.position = 'relative'
    video.style.paddingTop = '56.25%'
    video.style.height = '0'
    video.style.overflow = 'hidden'
    video.innerHTML = `
      <iframe
        src="${embedUrl}"
        width="100%"
        height="100%"
        style="position:absolute; left:0; top:0; width:100%; height:100%;"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
      ></iframe>
    `
    reveal(video)
  }

  const details = doc.querySelector('.rich-text-minus-20px')
  if (details) {
    details.innerHTML = project.details || ''
    reveal(details)
  }

  const gallery = doc.querySelectorAll('.rounded-image-2')
  if (gallery[0] && project.images[1]) {
    gallery[0].setAttribute('src', project.images[1])
    reveal(gallery[0])
  }
  if (gallery[1] && project.images[2]) {
    gallery[1].setAttribute('src', project.images[2])
    reveal(gallery[1])
  }

  const relatedGrid = doc.querySelector('.project-grid')
  if (relatedGrid) {
    const related = cms.projects.filter((item) => item.slug !== project.slug).slice(0, 3)
    relatedGrid.innerHTML = related.map(buildProjectItem).join('')
    const empty = doc.querySelector('.w-dyn-empty')
    if (empty) empty.remove()
  }

  const infoLabels = doc.querySelectorAll('.info-content .uppercase')
  if (infoLabels[0]) infoLabels[0].textContent = t('ui.client')
  if (infoLabels[1]) infoLabels[1].textContent = t('ui.role')
  if (infoLabels[2]) infoLabels[2].textContent = t('ui.year')

  const viewAll = doc.querySelector('.button.w-button')
  if (viewAll) viewAll.textContent = t('ui.viewAllProjects')

  const relatedTitle = doc.querySelector('h2.title-tag.big')
  if (relatedTitle) relatedTitle.textContent = t('ui.relatedWork')

  const viewAllLink = doc.querySelector('.button-liner')
  if (viewAllLink) {
    const label = viewAllLink.querySelector('div > div')
    if (label) label.textContent = t('ui.viewAll')
  }
}

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const { t, locale } = useI18n()
  const project = useMemo(() => getProjectBySlug(slug), [slug])

  if (!project) {
    return <WebflowPage html={notFoundTemplate} />
  }

  return <WebflowPage html={template} transform={createTransform(project, t)} refreshKey={locale} />
}
