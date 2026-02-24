import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import WebflowPage from '../components/WebflowPage.jsx'
import template from './raw/detail_post.html?raw'
import notFoundTemplate from './raw/404.html?raw'
import { getPostBySlug } from '../data/cms.js'
import { formatDate } from '../utils/html.js'
import { useI18n } from '../i18n/index.jsx'
import { applyFooterTranslations, applyNavTranslations } from '../utils/i18nDom.js'

const createTransform = (post, t) => (doc) => {
  if (!post) return
  doc.title = post.name

  applyNavTranslations(doc, t)
  applyFooterTranslations(doc, t)

  const categoryTag = doc.querySelector('.category-tag')
  if (categoryTag) {
    categoryTag.textContent = post.category?.name || post.categorySlug || ''
    categoryTag.setAttribute('href', post.category?.slug ? `/blog/category/${post.category.slug}` : '/blog-1')
    categoryTag.classList.remove('w-dyn-bind-empty')
  }

  const dateEl = doc.querySelector('.data')
  if (dateEl) {
    dateEl.textContent = formatDate(post.date)
    dateEl.classList.remove('w-dyn-bind-empty')
  }

  const title = doc.querySelector('.title-1.for-blog-page')
  if (title) {
    title.textContent = post.name
    title.classList.remove('w-dyn-bind-empty')
  }

  const cover = doc.querySelector('.cover-image')
  if (cover && post.image) {
    cover.setAttribute('src', post.image)
    cover.classList.remove('w-dyn-bind-empty')
  }

  const rich = doc.querySelector('.w-richtext')
  if (rich) {
    rich.innerHTML = post.body || ''
    rich.classList.remove('w-dyn-bind-empty')
  }
}

export default function BlogDetailPage() {
  const { slug } = useParams()
  const post = useMemo(() => getPostBySlug(slug), [slug])
  const { locale, t } = useI18n()

  if (!post) {
    return <WebflowPage html={notFoundTemplate} />
  }

  return <WebflowPage html={template} transform={createTransform(post, t)} refreshKey={locale} />
}
