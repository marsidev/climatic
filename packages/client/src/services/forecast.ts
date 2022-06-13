import type { Coordinates, LocationStatus } from '@types'
import type { ForecastResponse } from '@climatic/shared'

import {
  API_URL,
  SHOW_MOCK,
  DEFAULT_QUERY,
  DEFAULT_FORECAST_DAYS
} from '@lib/config'

export interface GetForecastByCoords {
  coords: Coordinates | null
  locationStatus: LocationStatus
}

export interface GetForecastByQuery {
  query: string
}

export const fetchForecastByCoords = async ({ coords, locationStatus }: GetForecastByCoords): Promise<ForecastResponse> => {
  const { latitude, longitude } = coords ?? {}

  const noCoords: boolean = !latitude && !longitude
  const noGeo: boolean = locationStatus === 'denied' || locationStatus === 'not_supported' || locationStatus === 'error'
  const validLocation = !noGeo && !noCoords

  let query: string = ''
  if (SHOW_MOCK && validLocation) query = 'mock-la'
  if (SHOW_MOCK && !validLocation) query = 'mock-bcn'
  if (!SHOW_MOCK && validLocation) query = `${latitude},${longitude}`
  if (!SHOW_MOCK && !validLocation) query = DEFAULT_QUERY

  const params = { q: query, days: DEFAULT_FORECAST_DAYS }
  const queryString = new URLSearchParams(params).toString()
  const url = `${API_URL}/forecast?${queryString}`
  return fetch(url).then(r => r.json())
}

export const fetchForecastByQuery = async ({ query }: GetForecastByQuery): Promise<ForecastResponse> => {
  const params = { q: query, days: DEFAULT_FORECAST_DAYS }
  const queryString = new URLSearchParams(params).toString()
  const url = `${API_URL}/forecast?${queryString}`
  return fetch(url).then(r => r.json())
}
