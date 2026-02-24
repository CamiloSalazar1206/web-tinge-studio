import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import WebflowPage from '../components/WebflowPage.jsx'
import template from './raw/detail_product.html?raw'
import notFoundTemplate from './raw/404.html?raw'
import { getProductBySlug } from '../data/cms.js'
import { useI18n } from '../i18n/index.jsx'
import { applyFooterTranslations, applyNavTranslations, setText, setInputValue } from '../utils/i18nDom.js'

const createTransform = (product, t) => (doc) => {
  if (!product) return
  doc.title = product.name

  applyNavTranslations(doc, t)
  applyFooterTranslations(doc, t)

  const heroTitle = doc.querySelector('h1.display-1')
  if (heroTitle) {
    heroTitle.textContent = product.name
    heroTitle.classList.remove('w-dyn-bind-empty')
  }

  const cardTitle = doc.querySelector('.main-pricing-title')
  if (cardTitle) cardTitle.textContent = product.name

  const price = doc.querySelector('.paragraph-product')
  if (price) price.textContent = product.price

  const description = doc.querySelector('.feature-second')
  if (description) description.textContent = product.description

  setText(doc, '.feature-big-title', t('ui.whatsIncluded'))
  setInputValue(doc, '.w-commerce-commerceaddtocartbutton', t('ui.addToCart'))
  const buyNow = doc.querySelector('.w-commerce-commercebuynowbutton')
  if (buyNow) buyNow.textContent = t('ui.buyNow')
}

export default function ProductDetailPage() {
  const { slug } = useParams()
  const product = useMemo(() => getProductBySlug(slug), [slug])
  const { locale, t } = useI18n()

  if (!product) {
    return <WebflowPage html={notFoundTemplate} />
  }

  return <WebflowPage html={template} transform={createTransform(product, t)} refreshKey={locale} />
}
