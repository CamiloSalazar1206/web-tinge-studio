import WebflowPage from '../components/WebflowPage.jsx'
import template from './raw/pricing.html?raw'
import { cms } from '../data/cms.js'
import { escapeHtml } from '../utils/html.js'
import { useI18n } from '../i18n/index.jsx'
import { applyFooterTranslations, applyNavTranslations, setHtml, setText } from '../utils/i18nDom.js'

const buildProductItem = (product, t) => `
  <div role="listitem" class="w-dyn-item">
    <div class="pricing-card">
      <div class="w-layout-grid top-part-grid">
        <div class="pricing-center-wrapper">
          <div>
            <h3 class="main-pricing-title">${escapeHtml(product.name)}</h3>
            <p class="paragraph-product">${escapeHtml(product.price)}</p>
          </div>
        </div>
      </div>
      <div class="margin-15px">
        <div class="w-layout-grid feature-grid center">
          <div class="feature-wrap-2">
            <div class="feature-big-title dark">${escapeHtml(t('ui.whatsIncluded'))}</div>
          </div>
          <div class="feature-wrap-2">
            <div class="feature-second">${escapeHtml(product.description || '')}</div>
          </div>
        </div>
      </div>
      <div class="margin-20px">
        <div>
          <div>
            <form data-node-type="commerce-add-to-cart-form" class="w-commerce-commerceaddtocartform default-state">
              <input type="submit" data-node-type="commerce-add-to-cart-button" data-loading-text="Adding to cart..." aria-busy="false" aria-haspopup="dialog" class="w-commerce-commerceaddtocartbutton button" value="${escapeHtml(t('ui.addToCart'))}">
              <a data-node-type="commerce-buy-now-button" data-default-text="Buy Now" data-subscription-text="Subscribe now" aria-busy="false" aria-haspopup="false" class="w-commerce-commercebuynowbutton button" href="/product/${product.slug}">${escapeHtml(t('ui.buyNow'))}</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
`

const createTransform = (products, t) => (doc) => {
  const grid = doc.querySelector('.pricing-grid')
  if (!grid) return
  grid.innerHTML = products.map((product) => buildProductItem(product, t)).join('')
  const empty = doc.querySelector('.w-dyn-empty')
  if (empty) empty.remove()

  applyNavTranslations(doc, t)
  applyFooterTranslations(doc, t)
  setHtml(doc, 'h1.display-1', t('pricing.title'))
  setHtml(doc, '.faq-grid .subhead', t('pricing.faq.title'))

  const faqQuestions = doc.querySelectorAll('.qa-text-main')
  const faqAnswers = doc.querySelectorAll('.toggle-content .paragraph')
  if (faqQuestions[0]) faqQuestions[0].textContent = t('pricing.faq.q1')
  if (faqQuestions[1]) faqQuestions[1].textContent = t('pricing.faq.q2')
  if (faqQuestions[2]) faqQuestions[2].textContent = t('pricing.faq.q3')
  if (faqQuestions[3]) faqQuestions[3].textContent = t('pricing.faq.q4')
  if (faqAnswers[0]) faqAnswers[0].textContent = t('pricing.faq.a1')
  if (faqAnswers[1]) faqAnswers[1].textContent = t('pricing.faq.a2')
  if (faqAnswers[2]) faqAnswers[2].textContent = t('pricing.faq.a3')
  if (faqAnswers[3]) faqAnswers[3].textContent = t('pricing.faq.a4')
}

export default function PricingPage() {
  const { t, locale } = useI18n()
  return <WebflowPage html={template} transform={createTransform(cms.products, t)} refreshKey={locale} />
}
