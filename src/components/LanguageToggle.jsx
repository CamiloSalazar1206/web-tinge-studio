import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/index.jsx'

export default function LanguageToggle() {
  const { locale, setLocale, t } = useI18n()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    const onClick = (event) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <div ref={rootRef} className="language-toggle">
      <span className="language-label">{t('app.language')}</span>
      <button
        type="button"
        className="language-trigger"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {locale === 'es' ? t('app.spanish') : t('app.english')}
      </button>
      {open ? (
        <div className="language-menu" role="listbox">
          <button
            type="button"
            className={`language-option ${locale === 'es' ? 'is-active' : ''}`}
            role="option"
            aria-selected={locale === 'es'}
            onClick={() => {
              setLocale('es')
              setOpen(false)
            }}
          >
            {t('app.spanish')}
          </button>
          <button
            type="button"
            className={`language-option ${locale === 'en' ? 'is-active' : ''}`}
            role="option"
            aria-selected={locale === 'en'}
            onClick={() => {
              setLocale('en')
              setOpen(false)
            }}
          >
            {t('app.english')}
          </button>
        </div>
      ) : null}
    </div>
  )
}
