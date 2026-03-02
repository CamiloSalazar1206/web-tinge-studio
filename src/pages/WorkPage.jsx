import WebflowPage from '../components/WebflowPage.jsx'
import template from './raw/work.html?raw'
import { cms } from '../data/cms.js'
import { useI18n } from '../i18n/index.jsx'
import { applyFooterTranslations, applyNavTranslations, setHtml } from '../utils/i18nDom.js'

const createTransform = (projects, t) => (doc) => {
  const grid = doc.querySelector('.project-grid')
  if (!grid) return

  // Preserve Webflow-generated markup (data-w-id + w-dyn-* bindings) by cloning the template item.
  // This is required for some interactions (e.g. hover/mouse-follow) to keep working after injection.
  const templateItem = grid.querySelector('.w-dyn-item')
  if (!templateItem) return

  grid.innerHTML = ''
  const fragment = doc.createDocumentFragment()
  projects.forEach((project) => {
    const item = templateItem.cloneNode(true)

    const image = item.querySelector('img.work-photo')
    if (image) {
      image.setAttribute('alt', project.name || '')
      image.setAttribute('src', project.images?.[0] || '')
      image.classList.remove('w-dyn-bind-empty')
    }

    const link = item.querySelector('a.project-circle')
    if (link) link.setAttribute('href', `/project/${project.slug}`)

    const titles = item.querySelectorAll('h3.text-rotator')
    titles.forEach((h3) => {
      h3.textContent = project.name || ''
      h3.classList.remove('w-dyn-bind-empty')
    })

    fragment.appendChild(item)
  })
  grid.appendChild(fragment)

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
