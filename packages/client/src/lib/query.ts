import type { ForecastResponse } from '@climatic/shared'
import type { Coordinates } from '@types'

import { DEFAULT_QUERY } from './constants'

export const coordsToQuery = (coords: Coordinates | null): string | null => {
  const { latitude, longitude } = coords ?? {}

  if (latitude && longitude) {
    return `${latitude.toFixed(4)},${longitude.toFixed(4)}`
  }

  return null
}

export const resolveDefaultQuery = (coords: Coordinates | null): string => {
  const coordsQuery = coordsToQuery(coords)

  if (coordsQuery) return coordsQuery

  return DEFAULT_QUERY
}

export const resolveQueryFromData = (forecastData: ForecastResponse): string => {
  const { location } = forecastData
  const { name, country } = location

  const query = `${name}-${country}`
    .toLowerCase()
    .replace(/ /g, '-')

  return query
}
