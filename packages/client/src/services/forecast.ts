import type { ForecastResponse } from '@climatic/shared'
import { DEFAULT_LOCATION, SHOW_MOCK_DATA_ON_DEV } from '@lib/constants'
import { Coordinates, LocationStatus } from '@types'

interface GetForecast {
  coords: Coordinates | null
  locationStatus: LocationStatus
}

const ENVIROMENT: any = process.env.NODE_ENV

export const getForecast = async ({ coords, locationStatus }: GetForecast): Promise<ForecastResponse> => {
  const latitude = coords?.latitude
  const longitude = coords?.longitude

  const noCoords: boolean = !latitude && !longitude
  const noGeo: boolean = locationStatus === 'denied' || locationStatus === 'not_supported' || locationStatus === 'error'
  let lat: string
  let lon: string
  let url: string

  if (SHOW_MOCK_DATA_ON_DEV && ENVIROMENT === 'development') {
    if (noGeo || noCoords) {
      console.log('retrieving default mock data')
      url = '/api/forecast?q=mock_BCN'
    } else {
      console.log('retrieving mock data with location')
      url = '/api/forecast?q=mock_LA'
    }
  } else {
    if (noGeo || noCoords) {
      console.log('no coords, fetching default forecast location')
      lat = DEFAULT_LOCATION.latitude?.toString() ?? ''
      lon = DEFAULT_LOCATION.longitude?.toString() ?? ''
    } else {
      console.log('fetching custom location forecast')
      lat = latitude?.toString() ?? ''
      lon = longitude?.toString() ?? ''
    }

    const params = { q: `${lat},${lon}`, days: '8' }
    const queryString = new URLSearchParams(params).toString()
    url = `/api/forecast?${queryString}`
  }

  console.log({ url })
  const data = await fetch(url).then(r => r.json())
  return data
}
