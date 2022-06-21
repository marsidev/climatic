import type { Locale } from '@climatic/shared'

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@climatic/shared'

// This is a dynamic import so not all languages are bundled in frontend.
const messageImports = import.meta.glob('./translations/*.json')

function importLocale(locale: Locale) {
  const [, importLocale] =
    Object.entries(messageImports).find(([key]) =>
      key.includes(`/${locale}.`)
    ) || []

  return importLocale && importLocale()
}

export async function loadAsyncLanguage(i18n: any, locale: Locale = DEFAULT_LOCALE) {
  try {
    const result = await importLocale(locale)
    if (result) {
      i18n.addResourceBundle(locale, 'translation', result.default || result)
      i18n.changeLanguage(locale)
    }
  } catch (error) {
    console.error(error)
  }
}

export async function installI18n(locale: Locale = DEFAULT_LOCALE) {
  locale = SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE
  const messages = await importLocale(locale)

  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      debug: false,
      resources: {
        // @ts-ignore
        [locale]: { translation: messages.default || messages }
      },
      lng: locale,
      fallbackLng: DEFAULT_LOCALE,
      interpolation: {
        escapeValue: false // react already safes from xss
      }
    })

  return i18n
}

export default i18n
export * from './locales'
