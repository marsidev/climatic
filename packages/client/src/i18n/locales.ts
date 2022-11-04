import type { Locale } from '~/../../packages/shared'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '~/../../packages/shared'

export function extractLocaleFromPath(path = '') {
	const maybeLocale = path.split('/')[1] as Locale

	return SUPPORTED_LOCALES.includes(maybeLocale) ? maybeLocale : DEFAULT_LOCALE
}
