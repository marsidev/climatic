import type { ForecastResponse } from '@climatic/shared'

import { useEffect } from 'react'
import { useStore } from '@store'
import useSWR from 'swr'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { resolveDefaultQuery, updatePageTitle, resolveQueryFromData, coordsToQuery } from '@lib'

type ReturnState = ForecastResponse | null

export const useForecast = (): ReturnState => {
  const coords = useStore(s => s.coords)
  const locationStatus = useStore(s => s.locationStatus)
  const forecastData = useStore(s => s.forecastData)
  const forecastQuery = useStore(s => s.forecastQuery)
  const temperatureUnit = useStore(s => s.temperatureUnit)
  const getForecastDataByCoords = useStore(s => s.getForecastDataByCoords)
  const getForecastDataByQuery = useStore(s => s.getForecastDataByQuery)
  const setForecastQuery = useStore(s => s.setForecastQuery)

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // this update the data based on the query that is saved on state
  useSWR('update_forecast', getForecastDataByQuery, {
    refreshInterval: 10 * 60 * 1000,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    refreshWhenHidden: true
  })

  const withErrors = (forecastData as any)?.error !== undefined
  useEffect(() => {
    if (withErrors) {
      const defaultQuery = resolveDefaultQuery(coords)
      setForecastQuery(defaultQuery)
      navigate({ search: `q=${defaultQuery}` })
    }
  }, [withErrors])

  // listen to searchParams changes.
  useEffect(() => {
    const query = searchParams.get('q')
    if (query) {
      setForecastQuery(query)
      getForecastDataByQuery()
    }
  }, [searchParams])

  // listen to locationStatus changes.
  useEffect(() => {
    const query = searchParams.get('q')
    if (!query) {
      if (locationStatus !== 'loading' && !forecastQuery) {
        getForecastDataByCoords().then(data => {
          let query = ''
          const coordsQuery = coordsToQuery(coords)
          if (coordsQuery) {
            query = coordsQuery
          } else {
            query = resolveQueryFromData(data)
          }

          setForecastQuery(query)
          navigate({ search: `?q=${query}` })
        })
      }
    }
  }, [locationStatus])

  // listen changes on forecast data to update page title
  useEffect(() => {
    if (forecastData && !withErrors) {
      updatePageTitle(forecastData, temperatureUnit)
    }
  }, [forecastData, temperatureUnit])

  if (withErrors) return null

  return forecastData
}

export default useForecast
