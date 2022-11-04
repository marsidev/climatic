import type { ForecastResponse, TemperatureUnit } from '~/../../packages/shared'
import { flag } from 'country-emoji'
import { formatTemperature } from './intl'

export const updatePageTitle = (forecastData: ForecastResponse, temperatureUnit: TemperatureUnit) => {
	const { location, currentWeather } = forecastData
	const { temperature, isDay } = currentWeather

	const { country, name: city } = location

	const _temperature = temperature[temperatureUnit]
	const temperatureString = formatTemperature(_temperature, temperatureUnit)
	const countryEmoji = flag(country)
	const timeEmoji = isDay ? '☀' : '🌙'
	const title = `${temperatureString} en ${city} ${countryEmoji} ${timeEmoji} | Climatic`
	document.title = title
}
