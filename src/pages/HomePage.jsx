import WebflowPage from '../components/WebflowPage.jsx'
import template from './raw/index.html?raw'
import { cms } from '../data/cms.js'
import { escapeHtml } from '../utils/html.js'
import { useI18n } from '../i18n/index.jsx'
import { applyFooterTranslations, applyNavTranslations, setHtml, setText } from '../utils/i18nDom.js'

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
  const items = projects.slice(0, 6)
  grid.innerHTML = items.map(buildProjectItem).join('')
  const empty = doc.querySelector('.w-dyn-empty')
  if (empty) empty.remove()

  applyNavTranslations(doc, t)
  applyFooterTranslations(doc, t)

  setText(doc, '.play-text', t('home.videoShowcase'))
  setHtml(doc, '.hero .subhead', t('home.heroSubtitle'))
  setText(doc, '.section .display-1', t('home.workTitle'))
  setHtml(doc, '.subhead.x2', t('home.servicesSubtitle'))

  const serviceTitles = doc.querySelectorAll('.option-title')
  const serviceDescriptions = doc.querySelectorAll('.service-card p')
  if (serviceTitles[0]) serviceTitles[0].textContent = t('home.service1.title')
  if (serviceTitles[1]) serviceTitles[1].textContent = t('home.service2.title')
  if (serviceTitles[2]) serviceTitles[2].textContent = t('home.service3.title')
  if (serviceDescriptions[0]) serviceDescriptions[0].textContent = t('home.service1.desc')
  if (serviceDescriptions[1]) serviceDescriptions[1].textContent = t('home.service2.desc')
  if (serviceDescriptions[2]) serviceDescriptions[2].textContent = t('home.service3.desc')

  const serviceButtons = doc.querySelectorAll('.button-line-main div')
  serviceButtons.forEach((button) => {
    button.textContent = t('ui.contactUs')
  })

  const stats = doc.querySelectorAll('.sub-text-about')
  if (stats[0]) stats[0].textContent = t('home.stats.projects')
  if (stats[1]) stats[1].textContent = t('home.stats.years')
  if (stats[2]) stats[2].textContent = t('home.stats.brands')

  setHtml(doc, '.margin-150px .subhead', t('home.statsSubtitle'))
  setHtml(doc, '[data-w-id="6f3713fe-ee5f-b0a3-fed4-ec90a52f89bd"]', t('home.statsSubtitle'))
  setHtml(doc, '.faq-grid .subhead', t('home.faq.title'))
  const faqQuestions = doc.querySelectorAll('.qa-text-main')
  const faqAnswers = doc.querySelectorAll('.toggle-content .paragraph')
  if (faqQuestions[0]) faqQuestions[0].textContent = t('home.faq.q1')
  if (faqQuestions[1]) faqQuestions[1].textContent = t('home.faq.q2')
  if (faqQuestions[2]) faqQuestions[2].textContent = t('home.faq.q3')
  if (faqQuestions[3]) faqQuestions[3].textContent = t('home.faq.q4')
  if (faqAnswers[0]) faqAnswers[0].textContent = t('home.faq.a1')
  if (faqAnswers[1]) faqAnswers[1].textContent = t('home.faq.a2')
  if (faqAnswers[2]) faqAnswers[2].textContent = t('home.faq.a3')
  if (faqAnswers[3]) faqAnswers[3].textContent = t('home.faq.a4')

  setText(doc, '.subhead.smaller', t('home.clientsTitle'))

  const heroButtons = doc.querySelectorAll('.button-with-animation .text-button')
  heroButtons.forEach((button) => {
    button.textContent = t('ui.contactUs')
  })
}

export default function HomePage() {
  const { locale, t } = useI18n()
  return <WebflowPage html={template} transform={createTransform(cms.projects, t)} refreshKey={locale} />
}
