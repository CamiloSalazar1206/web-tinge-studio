import { useEffect, useMemo, useRef } from 'react'

const CONTACT_FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || ''

const encodeFormBody = (formData) => {
  const params = new URLSearchParams()
  formData.forEach((value, key) => {
    params.append(key, String(value))
  })
  return params.toString()
}

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
    const rx = new RegExp(`href="${from}"`, 'g')
    output = output.replace(rx, `href="${to}"`)
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
  const parsed = useMemo(() => parseHtml(html, transform), [html, transform])
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

    const attachMouseFollowers = () => {
      const root = containerRef.current
      if (!root) return () => {}

      const wrappers = Array.from(root.querySelectorAll('.work-wrapper'))
      const cleanups = wrappers
        .map((wrapper) => {
          const circle = wrapper.querySelector('.project-circle')
          if (!circle) return null

          // Make movement feel smooth and prevent visible "jump" between cards.
          // We lerp towards the pointer position in a rAF loop, and hide on leave.
          circle.style.transform = 'translate(-50%, -50%)'
          circle.style.transition = 'opacity 120ms ease'
          circle.style.opacity = '0'

          let targetX = 0
          let targetY = 0
          let currentX = 0
          let currentY = 0
          let raf = 0
          let active = false

          const setTargetFromEvent = (event) => {
            const rect = wrapper.getBoundingClientRect()
            targetX = event.clientX - rect.left
            targetY = event.clientY - rect.top
          }

          const tick = () => {
            if (!active) {
              raf = 0
              return
            }
            // Lerp factor: smaller = smoother/slower.
            const alpha = 0.18
            currentX += (targetX - currentX) * alpha
            currentY += (targetY - currentY) * alpha
            circle.style.left = `${currentX}px`
            circle.style.top = `${currentY}px`
            raf = window.requestAnimationFrame(tick)
          }

          const onEnter = (event) => {
            active = true
            setTargetFromEvent(event)
            // Start exactly at cursor on enter (no jump), then lerp.
            currentX = targetX
            currentY = targetY
            circle.style.left = `${currentX}px`
            circle.style.top = `${currentY}px`
            circle.style.opacity = '1'
            if (!raf) raf = window.requestAnimationFrame(tick)
          }

          const onMove = (event) => {
            if (!active) return
            setTargetFromEvent(event)
          }

          const onLeave = () => {
            active = false
            circle.style.opacity = '0'
          }

          wrapper.addEventListener('mouseenter', onEnter)
          wrapper.addEventListener('mousemove', onMove)
          wrapper.addEventListener('mouseleave', onLeave)

          return () => {
            active = false
            if (raf) window.cancelAnimationFrame(raf)
            wrapper.removeEventListener('mouseenter', onEnter)
            wrapper.removeEventListener('mousemove', onMove)
            wrapper.removeEventListener('mouseleave', onLeave)
          }
        })
        .filter(Boolean)

      return () => {
        cleanups.forEach((fn) => fn())
      }
    }

    const attachContactFormHandler = () => {
      const root = containerRef.current
      if (!root) return () => {}

      const sourceForm = root.querySelector('#wf-form-Contact')
      if (!sourceForm) return () => {}

      const parent = sourceForm.parentNode
      if (!parent) return () => {}

      const form = sourceForm.cloneNode(true)
      parent.replaceChild(form, sourceForm)

      form.setAttribute('method', 'POST')
      form.setAttribute('name', form.getAttribute('data-name') || form.getAttribute('name') || 'Contact')
      form.setAttribute('data-netlify', 'true')

      const wrapper = form.closest('.w-form')
      const doneBlock = wrapper?.querySelector('.w-form-done') || null
      const failBlock = wrapper?.querySelector('.w-form-fail') || null
      const submitButton = form.querySelector('input[type="submit"], button[type="submit"]')
      const originalSubmitLabel = submitButton?.value || submitButton?.textContent || ''
      const waitLabel = submitButton?.getAttribute('data-wait') || 'Please wait...'

      if (doneBlock) doneBlock.style.display = 'none'
      if (failBlock) failBlock.style.display = 'none'
      form.style.display = 'block'

      const showSuccess = () => {
        form.style.display = 'none'
        if (failBlock) failBlock.style.display = 'none'
        if (doneBlock) doneBlock.style.display = 'block'
      }

      const showError = () => {
        form.style.display = 'block'
        if (doneBlock) doneBlock.style.display = 'none'
        if (failBlock) failBlock.style.display = 'block'
      }

      const setSubmitting = (submitting) => {
        if (!submitButton) return
        submitButton.disabled = submitting
        if ('value' in submitButton) {
          submitButton.value = submitting ? waitLabel : originalSubmitLabel
        } else {
          submitButton.textContent = submitting ? waitLabel : originalSubmitLabel
        }
      }

      const onSubmit = async (event) => {
        event.preventDefault()
        event.stopPropagation()
        if (event.stopImmediatePropagation) {
          event.stopImmediatePropagation()
        }

        const endpoint = (form.getAttribute('action') || CONTACT_FORM_ENDPOINT || '/').trim()

        setSubmitting(true)

        try {
          const method = ((form.getAttribute('method') || 'POST').toUpperCase() === 'GET') ? 'POST' : (form.getAttribute('method') || 'POST').toUpperCase()
          const payload = new FormData(form)
          const formName = form.getAttribute('name') || form.getAttribute('data-name') || 'Contact'

          if (!payload.get('form-name')) {
            payload.append('form-name', formName)
          }

          const useNetlifyFormat = !CONTACT_FORM_ENDPOINT

          const response = await fetch(endpoint, useNetlifyFormat
            ? {
                method,
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: encodeFormBody(payload),
              }
            : {
                method,
                body: payload,
              })

          if (!response.ok) {
            throw new Error(`Contact form request failed: ${response.status}`)
          }

          form.reset()
          showSuccess()
        } catch (error) {
          console.error(error)
          showError()
        } finally {
          setSubmitting(false)
        }
      }

      form.addEventListener('submit', onSubmit)

      return () => {
        form.removeEventListener('submit', onSubmit)
      }
    }

    const id = window.requestAnimationFrame(runWebflow)
    const detachMouseFollowers = attachMouseFollowers()
    const detachContactFormHandler = attachContactFormHandler()
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
      detachMouseFollowers()
      detachContactFormHandler()
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
