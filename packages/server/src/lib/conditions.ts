import allConditions from '~/../../packages/shared/src/mocks/api/source/conditions-multilang.json'

interface Condition {
	id: number
	iconId: number
	day: {
		name: string
		icon: string
	}
	night: {
		name: string
		icon: string
	}
}

const getConditionsByLocale = (locale: string): Condition[] => {
	const data = allConditions.map(c => {
		const { languages, ...data } = c

		const lang = languages.find(l => l.lang_iso === locale)
		if (lang) {
			return {
				id: data.code,
				iconId: data.icon,
				day: {
					name: lang.day_text,
					icon: `/day/${data.icon}.png`
				},
				night: {
					name: lang.night_text,
					icon: `/night/${data.icon}.png`
				}
			}
		}

		// returns dafault locale (en)
		return {
			id: data.code,
			iconId: data.icon,
			day: {
				name: data.day,
				icon: `/day/${data.icon}.png`
			},
			night: {
				name: data.night,
				icon: `/night/${data.icon}.png`
			}
		}
	})

	// console.log({ locale, data0: data[0], count: data.length })

	return data
}

export const getSupportedLocales = () => {
	const data = allConditions[0].languages.map(l => l.lang_iso)
	return ['en', ...data]
}

export const generatei18nDictionary = (locale: string) => {
	const conditions = getConditionsByLocale(locale)

	const dayData = {}
	const nightData = {}

	conditions.forEach(c => {
		const dayKey = `day-${c.id}`
		const nightKey = `night-${c.id}`

		dayData[dayKey] = c.day.name
		nightData[nightKey] = c.night.name
	})

	return {
		conditions: {
			day: dayData,
			night: nightData
		}
	}
}
