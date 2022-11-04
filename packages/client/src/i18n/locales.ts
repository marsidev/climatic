import type { Locale } from '@climatic/shared'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@climatic/shared'

export function extractLocaleFromPath(path = '') {
	const maybeLocale = path.split('/')[1] as Locale

	return SUPPORTED_LOCALES.includes(maybeLocale) ? maybeLocale : DEFAULT_LOCALE
}
