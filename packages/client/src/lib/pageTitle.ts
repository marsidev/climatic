import type { ForecastResponse } from '@climatic/shared'

import { flag } from 'country-emoji'
import { formatTemperature } from './intl'
import { DEFAULT_TEMPERATURE_UNIT } from './config'

export const updatePageTitle = (forecastData: ForecastResponse) => {
  const { location, currentWeather } = forecastData
  const { temperature, isDay } = currentWeather

  const { country, name: city } = location

  const _temperature = temperature[DEFAULT_TEMPERATURE_UNIT]
  const temperatureString = formatTemperature(_temperature, DEFAULT_TEMPERATURE_UNIT)
  const countryEmoji = flag(country)
  const timeEmoji = isDay ? '☀' : '🌙'
  const title = `${temperatureString} en ${city} ${countryEmoji} ${timeEmoji} | Climatic`
  document.title = title
}
