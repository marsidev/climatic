import type { ForecastResponse } from '@climatic/shared'
import { useEffect } from 'react'
import { useStore } from '@store'

type ReturnState = ForecastResponse | null

export const useForecast = (): ReturnState => {
  const { coords, locationStatus, forecastData, getForecastData } = useStore()

  useEffect(() => {
    if (locationStatus !== 'loading') {
      getForecastData({ coords, locationStatus })
    }
  }, [locationStatus])

  return forecastData
}

export default useForecast
