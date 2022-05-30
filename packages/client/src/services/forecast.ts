import type { Location } from '@types'
import type { ForecastResponse } from '@climatic/shared'
import { DEFAULT_LOCATION } from '@lib/constants'

export const getForecast = async (locationData: Location): Promise<ForecastResponse> => {
  const { coords, status } = locationData
  const latitude = coords?.latitude
  const longitude = coords?.longitude

  const noCoords: boolean = !latitude && !longitude
  const noGeo: boolean = status === 'denied' || status === 'not_supported' || status === 'error'
  let lat: string
  let lon: string

  if (noGeo || noCoords) {
    console.log('no geo, fetching default forecast location')
    lat = DEFAULT_LOCATION.latitude?.toString() ?? ''
    lon = DEFAULT_LOCATION.longitude?.toString() ?? ''
  } else {
    lat = latitude?.toString() ?? ''
    lon = longitude?.toString() ?? ''
  }

  const params = { q: `${lat},${lon}`, days: '8' }
  const queryString = new URLSearchParams(params).toString()
  const url: string = `/api/forecast?${queryString}`

  console.log({ url })
  const data = await fetch(url).then(r => r.json())
  return data
}
