import type { ForecastResponse, TemperatureUnit } from '@climatic/shared'
import { useEffect } from 'react'
import { useStore } from '@store'
import { formatTemperature } from '@lib/intl'

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

      const unit: TemperatureUnit = 'celsius'
      const _temperature = temperature[unit]
      const temperatureString = formatTemperature(_temperature, unit)
      const city = location.name
      const timeEmoji = isDay ? '☀' : '🌕'

      const title = `${temperatureString} en ${city} ${timeEmoji} | Climatic`
      document.title = title
    }
  }, [forecastData])

  return forecastData
}

export default useForecast
