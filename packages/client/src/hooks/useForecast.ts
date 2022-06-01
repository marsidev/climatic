import type { ForecastResponse } from '@climatic/shared'
import { useEffect } from 'react'
import { useStore } from '@store'
import { formatTemperature } from '@lib/intl'
import { DEFAULT_TEMPERATURE_UNIT } from '@lib/constants'
import { flag } from 'country-emoji'

type ReturnState = ForecastResponse | null

export const useForecast = (): ReturnState => {
  const { coords, locationStatus, forecastData, getForecastData } = useStore()

  useEffect(() => {
    if (locationStatus !== 'loading') {
      getForecastData({ coords, locationStatus })
    }
  }, [locationStatus])

  useEffect(() => {
    if (forecastData) {
      const { location, currentWeather } = forecastData
      const { temperature, isDay } = currentWeather

      const { country, name: city } = location

      const _temperature = temperature[DEFAULT_TEMPERATURE_UNIT]
      const temperatureString = formatTemperature(_temperature, DEFAULT_TEMPERATURE_UNIT)
      const countryEmoji = flag(country)
      const timeEmoji = isDay ? '☀' : '🌕'

      const title = `${temperatureString} en ${city} ${countryEmoji} ${timeEmoji} | Climatic`
      document.title = title
    }
  }, [forecastData])

  return forecastData
}

export default useForecast
