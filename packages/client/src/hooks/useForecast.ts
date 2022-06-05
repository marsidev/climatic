import type { ForecastResponse } from '@climatic/shared'
import { useEffect } from 'react'
import { useStore } from '@store'
import { formatTemperature } from '@lib/intl'
import { DEFAULT_TEMPERATURE_UNIT } from '@lib/constants'
import { flag } from 'country-emoji'
import useSWR from 'swr'
import { useParams, useNavigate } from 'react-router-dom'

type ReturnState = ForecastResponse | null

export const useForecast = (): ReturnState => {
  const {
    coords,
    locationStatus,
    forecastData,
    forecastQuery,
    getForecastDataByCoords,
    getForecastDataByQuery,
    setForecastQuery,
    setForecastData
  } = useStore()

  const params = useParams()
  const navigate = useNavigate()

  // this update the data based on the query that is saved on state
  useSWR('update_forecast', getForecastDataByQuery, {
    refreshInterval: 10 * 60 * 1000,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    refreshWhenHidden: true
  })

  const withErrors = (forecastData as any)?.error
  useEffect(() => {
    if (withErrors) {
      console.log({ withErrors })
      setForecastData(null)
      setForecastQuery('')
      navigate('/barcelona-spain')
    }
  }, [withErrors])

  /*
    listen to url params and locationStatus changes.
    if there is a query, fetch the query, if not, try no get the data of current location
  */
  useEffect(() => {
    const { query } = params
    if (query) {
      setForecastQuery(query)
      getForecastDataByQuery()
    } else {
      const { latitude, longitude } = coords ?? {}
      const noQuery = !forecastQuery || forecastQuery.includes('undefined')

      if (locationStatus !== 'loading' && noQuery) {
        if (latitude && latitude) {
          const query = `${latitude},${longitude}`
          setForecastQuery(query)
        }

        getForecastDataByCoords()
      }
    }
  }, [params, locationStatus])

  // listen changes on forecast data to update page title
  useEffect(() => {
    if (forecastData && !withErrors) {
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

  if (withErrors) return null
  return forecastData
}

export default useForecast
