import type { Locale } from '~/../../packages/shared'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '~/../../packages/shared'
import es from '@/i18n/translations/es.json'
import en from '@/i18n/translations/en.json'

export function installI18n(locale: Locale = DEFAULT_LOCALE) {
	locale = SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE

	i18n
		.use(initReactI18next) // passes i18n down to react-i18next
		.init({
			debug: false,
			resources: {
				es: { translation: es },
				en: { translation: en }
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
export * from '@/i18n/locales'
