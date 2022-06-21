import type { Coordinates, LocationStatus } from '@types'
import type { ForecastResponse, Locale } from '@climatic/shared'

import {
  API_URL,
  SHOW_MOCK,
  DEFAULT_QUERY,
  DEFAULT_FORECAST_DAYS
} from '@lib/config'
import i18n from '@/i18n'

export interface GetForecastByCoords {
  coords: Coordinates | null
  locationStatus: LocationStatus
  lang?: Locale
}

export interface GetForecastByQuery {
  query: string
  lang?: Locale
}

export const fetchForecastByCoords = async ({ coords, locationStatus, lang }: GetForecastByCoords): Promise<ForecastResponse> => {
  const { latitude, longitude } = coords ?? {}
  const language = lang ?? i18n.language

  const noCoords: boolean = !latitude && !longitude
  const noGeo: boolean = locationStatus === 'denied' || locationStatus === 'not_supported' || locationStatus === 'error'
  const validLocation = !noGeo && !noCoords

  let query: string = ''
  if (SHOW_MOCK && validLocation) query = 'mock-la'
  if (SHOW_MOCK && !validLocation) query = 'mock-bcn'
  if (!SHOW_MOCK && validLocation) query = `${latitude},${longitude}`
  if (!SHOW_MOCK && !validLocation) query = DEFAULT_QUERY

  const params = { q: query, days: DEFAULT_FORECAST_DAYS, lang: language }
  const queryString = new URLSearchParams(params).toString()
  const url = `${API_URL}/forecast?${queryString}`

  return fetch(url)
    .then(r => r.json())
    .catch(console.error)
}

export const fetchForecastByQuery = async ({ query, lang }: GetForecastByQuery): Promise<ForecastResponse> => {
  const language = lang ?? i18n.language

  const params = { q: query, days: DEFAULT_FORECAST_DAYS, lang: language }
  const queryString = new URLSearchParams(params).toString()
  const url = `${API_URL}/forecast?${queryString}`

  return fetch(url)
    .then(r => r.json())
    .catch(console.error)
}
