import type { Language } from '../types'

export const SUPPORTED_LANGUAGES: Language[] = [
	{
		locale: 'en',
		name: 'English',
		default: true
	},
	{
		locale: 'es',
		name: 'Español'
	}
]

export const SUPPORTED_LOCALES = SUPPORTED_LANGUAGES.map(l => l.locale)

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES.find(l => l.default) as Language

export const DEFAULT_LOCALE = DEFAULT_LANGUAGE?.locale
