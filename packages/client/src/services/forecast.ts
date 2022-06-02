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

const ENVIROMENT: any = process.env.NODE_ENV

export const fetchForecastByCoords = async ({ coords, locationStatus }: GetForecastByCoords): Promise<ForecastResponse> => {
  const latitude = coords?.latitude
  const longitude = coords?.longitude

  const noCoords: boolean = !latitude && !longitude
  const noGeo: boolean = locationStatus === 'denied' || locationStatus === 'not_supported' || locationStatus === 'error'
  let lat: string
  let lon: string
  let url: string

  if (SHOW_MOCK_DATA_ON_DEV && ENVIROMENT === 'development') {
    if (noGeo || noCoords) {
      url = '/api/forecast?q=mock-bcn'
    } else {
      url = '/api/forecast?q=mock-la'
    }
  } else {
    if (noGeo || noCoords) {
      lat = DEFAULT_LOCATION.latitude?.toString() ?? ''
      lon = DEFAULT_LOCATION.longitude?.toString() ?? ''
    } else {
      lat = latitude?.toString() ?? ''
      lon = longitude?.toString() ?? ''
    }

    const params = { q: `${lat},${lon}`, days: '8' }
    const queryString = new URLSearchParams(params).toString()
    url = `/api/forecast?${queryString}`
  }

  const data = await fetch(url).then(r => r.json())
  return data
}

export const fetchForecastByQuery = async ({ query }: GetForecastByQuery): Promise<ForecastResponse> => {
  const params = { q: query }
  const queryString = new URLSearchParams(params).toString()
  const url = `/api/forecast?${queryString}`

  const data = await fetch(url).then(r => r.json())
  return data
}
