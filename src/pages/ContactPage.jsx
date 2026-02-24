import WebflowPage from '../components/WebflowPage.jsx'
import template from './raw/contact.html?raw'
import { useI18n } from '../i18n/index.jsx'
import { applyFooterTranslations, applyNavTranslations, setHtml, setText, setInputPlaceholder, setInputValue } from '../utils/i18nDom.js'

const createTransform = (t) => (doc) => {
  applyNavTranslations(doc, t)
  applyFooterTranslations(doc, t)

  setHtml(doc, 'h1.display-1', t('contact.title'))
  setHtml(doc, '.max-w-center .subhead', t('contact.subtitle'))

  const labels = doc.querySelectorAll('.label.dark')
  if (labels[0]) labels[0].textContent = t('contact.form.fullName')
  if (labels[1]) labels[1].textContent = t('contact.form.email')
  if (labels[2]) labels[2].textContent = t('contact.form.phone')

  setInputPlaceholder(doc, '#Contact-Name', t('contact.form.fullNamePlaceholder'))
  setInputPlaceholder(doc, '#Contact-Email', t('contact.form.emailPlaceholder'))
  setInputPlaceholder(doc, '#Contact-Phone', t('contact.form.phonePlaceholder'))

  setInputValue(doc, '.button.white.w-button', t('contact.form.submit'))

  setText(doc, '.success-message-2 div div', t('contact.form.success'))
  setText(doc, '.error-message-2 div', t('contact.form.error'))

  setHtml(doc, '.faq-grid .subhead', t('contact.faq.title'))
  const faqQuestions = doc.querySelectorAll('.qa-text-main')
  const faqAnswers = doc.querySelectorAll('.toggle-content .paragraph')
  if (faqQuestions[0]) faqQuestions[0].textContent = t('contact.faq.q1')
  if (faqQuestions[1]) faqQuestions[1].textContent = t('contact.faq.q2')
  if (faqQuestions[2]) faqQuestions[2].textContent = t('contact.faq.q3')
  if (faqQuestions[3]) faqQuestions[3].textContent = t('contact.faq.q4')
  if (faqAnswers[0]) faqAnswers[0].textContent = t('contact.faq.a1')
  if (faqAnswers[1]) faqAnswers[1].textContent = t('contact.faq.a2')
  if (faqAnswers[2]) faqAnswers[2].textContent = t('contact.faq.a3')
  if (faqAnswers[3]) faqAnswers[3].textContent = t('contact.faq.a4')
}

export default function ContactPage() {
  const { locale, t } = useI18n()
  return <WebflowPage html={template} transform={createTransform(t)} refreshKey={locale} />
}
