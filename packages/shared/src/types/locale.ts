export type Locale = 'en' | 'es'

export interface Language {
	locale: Locale
	name: string
	default?: boolean
}
