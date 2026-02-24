import { useEffect, useMemo, useRef } from 'react'

const ROUTE_MAP = {
  'index.html': '/',
  'about.html': '/about',
  'work.html': '/work',
  'contact.html': '/contact',
  'pricing.html': '/pricing',
  'blog-1.html': '/blog-1',
  'checkout.html': '/checkout',
  'order-confirmation.html': '/order-confirmation',
  'paypal-checkout.html': '/paypal-checkout',
  'detail_category.html': '/detail-category',
  'detail_post-categories.html': '/detail-post-categories',
  'detail_post.html': '/detail-post',
  'detail_product.html': '/detail-product',
  'detail_project.html': '/detail-project',
  'detail_sku.html': '/detail-sku',
  '401.html': '/401',
  '404.html': '/404',
}

const toAbsoluteAssets = (html) => {
  return html.replace(/(["'\s,(])(images|documents|fonts|js)\//g, '$1/$2/')
}

const toSpaLinks = (html) => {
  let output = html
  for (const [from, to] of Object.entries(ROUTE_MAP)) {
    const rx = new RegExp(`href=\"${from}\"`, 'g')
    output = output.replace(rx, `href=\"${to}\"`)
  }
  return output
}

const parseHtml = (html, transform) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  if (transform) {
    transform(doc)
  }
  const title = doc.title || ''
  const body = doc.body?.innerHTML || ''
  const styles = Array.from(doc.head.querySelectorAll('style'))
    .map((style) => style.innerHTML)
    .join('\n')
  return { title, body, styles }
}

export default function WebflowPage({ html, transform, refreshKey }) {
  const containerRef = useRef(null)
  const parsed = useMemo(() => parseHtml(html, transform), [html, transform, refreshKey])
  const content = useMemo(() => toSpaLinks(toAbsoluteAssets(parsed.body)), [parsed.body])

  useEffect(() => {
    if (parsed.title) {
      document.title = parsed.title
    }
  }, [parsed.title])

  useEffect(() => {
    const runWebflow = () => {
      if (!window.Webflow) return
      window.Webflow.destroy()
      window.Webflow.ready()
      if (window.Webflow.require) {
        try {
          window.Webflow.require('ix2').init()
        } catch {
          // ignore if IX2 isn't available
        }
      }
      document.dispatchEvent(new Event('readystatechange'))
    }

    const id = window.requestAnimationFrame(runWebflow)
    const fallbackId = window.setTimeout(() => {
      const root = containerRef.current
      if (!root) return
      const candidates = root.querySelectorAll('[data-w-id]')
      candidates.forEach((el) => {
        const style = el.getAttribute('style') || ''
        if (style.includes('opacity:0') || style.includes('opacity: 0')) {
          el.style.opacity = '1'
        }
        if (style.includes('transform')) {
          el.style.transform = 'none'
        }
      })
    }, 900)

    const fallbackId2 = window.setTimeout(() => {
      const root = containerRef.current
      if (!root) return
      const candidates = root.querySelectorAll('[data-w-id]')
      candidates.forEach((el) => {
        const style = el.getAttribute('style') || ''
        if (style.includes('opacity:0') || style.includes('opacity: 0')) {
          el.style.opacity = '1'
        }
        if (style.includes('transform')) {
          el.style.transform = 'none'
        }
      })
    }, 1600)

    return () => {
      window.cancelAnimationFrame(id)
      window.clearTimeout(fallbackId)
      window.clearTimeout(fallbackId2)
    }
  }, [content, refreshKey])

  return (
    <>
      {parsed.styles ? <style dangerouslySetInnerHTML={{ __html: parsed.styles }} /> : null}
      <div ref={containerRef} dangerouslySetInnerHTML={{ __html: content }} />
    </>
  )
}
