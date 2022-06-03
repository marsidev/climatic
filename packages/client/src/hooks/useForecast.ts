import type { ForecastResponse } from '@climatic/shared'
import { useEffect } from 'react'
import { useStore } from '@store'
import { formatTemperature } from '@lib/intl'
import { DEFAULT_TEMPERATURE_UNIT } from '@lib/constants'
import { flag } from 'country-emoji'
import useSWR from 'swr'

type ReturnState = ForecastResponse | null

export const useForecast = (): ReturnState => {
  const { coords, locationStatus, forecastData, forecastQuery, getForecastDataByCoords, setForecastQuery, updateForecastData } = useStore()

  useSWR('update_forecast', updateForecastData, {
    refreshInterval: 5 * 60 * 1000
  })

  useEffect(() => {
    const { latitude, longitude } = coords ?? {}

    const noQuery = !forecastQuery || forecastQuery.includes('undefined')

    if (locationStatus !== 'loading' && noQuery) {
      getForecastDataByCoords()
      const query = `${latitude},${longitude}`
      setForecastQuery(query)
    }
  }, [locationStatus])

  // listen changes on forecast data to update page title
  useEffect(() => {
    if (forecastData) {
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
  }, [forecastData])

  return forecastData
}

export default useForecast
