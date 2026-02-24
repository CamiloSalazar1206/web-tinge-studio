import { useParams } from 'react-router-dom'
import WebflowPage from '../components/WebflowPage.jsx'
import template from './raw/blog-1.html?raw'
import { cms } from '../data/cms.js'
import { escapeHtml, formatDate } from '../utils/html.js'
import { useI18n } from '../i18n/index.jsx'
import { applyFooterTranslations, applyNavTranslations, setHtml } from '../utils/i18nDom.js'

const buildPostItem = (post, t) => {
  const categoryName = post.category?.name || post.categorySlug || ''
  const categorySlug = post.category?.slug || post.categorySlug || ''
  const categoryHref = categorySlug ? `/blog/category/${categorySlug}` : '/blog-1'
  return `
    <div role="listitem" class="w-dyn-item">
      <div>
        <a href="/blog/${post.slug}" class="blog-image w-inline-block">
          <img alt="${escapeHtml(post.name)}" loading="lazy" src="${post.image || ''}" class="work-photo">
        </a>
        <div class="blog-content">
          <div class="button-flex second">
            <a href="${categoryHref}" class="category-tag">${escapeHtml(categoryName)}</a>
            <p class="data">${escapeHtml(formatDate(post.date))}</p>
          </div>
          <a href="/blog/${post.slug}" class="blog-title">${escapeHtml(post.name)}</a>
          <div class="margin-20px">
            <a href="/blog/${post.slug}" class="button-line-main w-inline-block">
              <div>${escapeHtml(t('ui.readMore'))}</div><img src="images/next.svg" loading="lazy" alt="" class="icon-line">
            </a>
          </div>
        </div>
      </div>
    </div>
  `
}

const createTransform = (posts, t) => (doc) => {
  const grid = doc.querySelector('.blog-grid')
  if (!grid) return
  grid.innerHTML = posts.map((post) => buildPostItem(post, t)).join('')
  const empty = doc.querySelector('.w-dyn-empty')
  if (empty) empty.remove()

  applyNavTranslations(doc, t)
  applyFooterTranslations(doc, t)
  setHtml(doc, 'h1.display-1', t('blog.title'))
}

export default function BlogPage() {
  const { t, locale } = useI18n()
  const params = useParams()
  const categorySlug = params.slug || ''
  const posts = categorySlug ? cms.posts.filter((post) => post.categorySlug === categorySlug) : cms.posts

  return <WebflowPage html={template} transform={createTransform(posts, t)} refreshKey={locale} />
}
