export const setText = (doc, selector, value) => {
  const el = doc.querySelector(selector)
  if (el) el.textContent = value
}

export const setHtml = (doc, selector, value) => {
  const el = doc.querySelector(selector)
  if (el) el.innerHTML = value
}

export const setInputPlaceholder = (doc, selector, value) => {
  const el = doc.querySelector(selector)
  if (el) el.setAttribute('placeholder', value)
}

export const setInputValue = (doc, selector, value) => {
  const el = doc.querySelector(selector)
  if (el) el.setAttribute('value', value)
}

export const applyNavTranslations = (doc, t) => {
  const navLinks = doc.querySelectorAll('.navigation-items .navigation-link-move')
  const labels = [t('nav.home'), t('nav.work'), t('nav.contact')]
  navLinks.forEach((link, index) => {
    const label = labels[index] || ''
    const full = link.querySelector('.text-full')
    const line = link.querySelector('.text-line')
    if (full) full.textContent = label
    if (line) line.textContent = label
  })
}

export const applyFooterTranslations = (doc, t) => {
  const cta = doc.querySelector('.cta-title')
  if (cta) cta.innerHTML = t('footer.ctaTitle')

  const ctaButton = doc.querySelector('.cta-wrapper .text-button')
  if (ctaButton) ctaButton.textContent = t('ui.contactUs')

  const visitTag = doc.querySelector('.footer-title-tag')
  if (visitTag) visitTag.textContent = t('footer.visitUs')

  const stayTags = doc.querySelectorAll('.footer-title-tag')
  if (stayTags[1]) stayTags[1].textContent = t('footer.stayInTouch')

  const copyright = doc.querySelector('.copyright')
  if (copyright) copyright.textContent = t('footer.copyright')
}
