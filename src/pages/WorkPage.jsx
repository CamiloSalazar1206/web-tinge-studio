import WebflowPage from '../components/WebflowPage.jsx'
import template from './raw/work.html?raw'
import { cms } from '../data/cms.js'
import { escapeHtml } from '../utils/html.js'
import { useI18n } from '../i18n/index.jsx'
import { applyFooterTranslations, applyNavTranslations, setHtml } from '../utils/i18nDom.js'

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

const createTransform = (projects, t) => (doc) => {
  const grid = doc.querySelector('.project-grid')
  if (!grid) return
  grid.innerHTML = projects.map(buildProjectItem).join('')
  const empty = doc.querySelector('.w-dyn-empty')
  if (empty) empty.remove()

  applyNavTranslations(doc, t)
  applyFooterTranslations(doc, t)
  setHtml(doc, 'h1.display-1', t('work.title'))
}

export default function WorkPage() {
  const { locale, t } = useI18n()
  return <WebflowPage html={template} transform={createTransform(cms.projects, t)} refreshKey={locale} />
}
