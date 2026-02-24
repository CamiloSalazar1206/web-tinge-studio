import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import en from './en.json'
import es from './es.json'

const DICTS = { en, es }
const DEFAULT_LOCALE = 'es'
const STORAGE_KEY = 'tinge.locale'

const I18nContext = createContext({
  locale: DEFAULT_LOCALE,
  t: (key) => key,
  setLocale: () => {},
})

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(DEFAULT_LOCALE)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && DICTS[stored]) {
      setLocaleState(stored)
      return
    }
    const browser = navigator.language?.slice(0, 2)
    if (browser && DICTS[browser]) {
      setLocaleState(browser)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    window.localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  const t = useCallback((key) => {
    const dict = DICTS[locale] || DICTS[DEFAULT_LOCALE]
    return dict[key] || key
  }, [locale])

  const value = useMemo(() => ({ locale, setLocale: setLocaleState, t }), [locale, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  return useContext(I18nContext)
}
