import WebflowPage from '../components/WebflowPage.jsx'
import template from './raw/about.html?raw'
import { useI18n } from '../i18n/index.jsx'
import { applyFooterTranslations, applyNavTranslations, setHtml, setText } from '../utils/i18nDom.js'

const createTransform = (t) => (doc) => {
  applyNavTranslations(doc, t)
  applyFooterTranslations(doc, t)

  setHtml(doc, 'h1.display-1', t('about.title'))
  setHtml(doc, '.main-grid .subhead', t('about.story'))

  const joinButton = doc.querySelector('.button-with-animation .text-button')
  if (joinButton) joinButton.textContent = t('about.joinUs')

  setHtml(doc, 'h2.title-tag.big.center', t('about.teamTitle'))

  const roles = doc.querySelectorAll('.job-role')
  if (roles[0]) roles[0].textContent = t('about.roles.cofounder')
  if (roles[1]) roles[1].textContent = t('about.roles.marketing')
  if (roles[2]) roles[2].textContent = t('about.roles.developer')

  setHtml(doc, '.margim-150px .subhead', t('about.statsSubtitle'))

  const stats = doc.querySelectorAll('.sub-text-about')
  if (stats[0]) stats[0].textContent = t('about.stats.projects')
  if (stats[1]) stats[1].textContent = t('about.stats.years')
  if (stats[2]) stats[2].textContent = t('about.stats.awards')
}

export default function AboutPage() {
  const { locale, t } = useI18n()
  return <WebflowPage html={template} transform={createTransform(t)} refreshKey={locale} />
}
