import type { Coordinates, LocationStatus } from '@types'
import type { ForecastResponse } from '@climatic/shared'

import { DEFAULT_LOCATION, SHOW_MOCK_DATA_ON_DEV } from '@lib/constants'

export interface GetForecastByCoords {
  coords: Coordinates | null
  locationStatus: LocationStatus
}

export interface GetForecastByQuery {
  query: string
}

const ENVIRONMENT: any = process.env.NODE_ENV
const DEV_MODE: boolean = ENVIRONMENT === 'development'
const SHOW_MOCK: boolean = SHOW_MOCK_DATA_ON_DEV && DEV_MODE
const DEFAULT_FORECAST_DAYS = '8'

export const fetchForecastByCoords = async ({ coords, locationStatus }: GetForecastByCoords): Promise<ForecastResponse> => {
  const { latitude, longitude } = coords ?? {}
  const { latitude: defaultLat, longitude: defaultLon } = DEFAULT_LOCATION

  const noCoords: boolean = !latitude && !longitude
  const noGeo: boolean = locationStatus === 'denied' || locationStatus === 'not_supported' || locationStatus === 'error'
  const validLocation = noGeo || noCoords

  let query: string = ''
  if (SHOW_MOCK && validLocation) query = 'mock-la'
  if (SHOW_MOCK && !validLocation) query = 'mock-bcn'
  if (!SHOW_MOCK && validLocation) query = `${defaultLat},${defaultLon}`
  if (!SHOW_MOCK && !validLocation) query = `${latitude},${longitude}`

  const params = { q: query, days: DEFAULT_FORECAST_DAYS }
  const queryString = new URLSearchParams(params).toString()
  const url = `/api/forecast?${queryString}`

  return fetch(url).then(r => r.json())
}

export const fetchForecastByQuery = async ({ query }: GetForecastByQuery): Promise<ForecastResponse> => {
  const params = { q: query, days: DEFAULT_FORECAST_DAYS }
  const queryString = new URLSearchParams(params).toString()
  const url = `/api/forecast?${queryString}`

  return fetch(url).then(r => r.json())
}
