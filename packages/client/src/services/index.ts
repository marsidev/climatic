import type { Geo } from '@types'
import type { ForecastResponse } from '@types'

export const getForecast = async (geoData: Geo): Promise<ForecastResponse> => {
  const { latitude, longitude, status } = geoData

  const noCoords: boolean = !latitude && !longitude
  const noGeo: boolean = status === 'denied' || status === 'not_supported' || status === 'error'
  let url: string

  if (noGeo) {
    console.log('no geo, fetching default forecast location')
    url = '/api/forecast?days=8'
  } else if (noCoords) {
    console.log('no geo, fetching default forecast location')
    url = '/api/forecast?days=8'
  } else {
    const lat = latitude?.toString()
    const lon = longitude?.toString()
    const query = `${lat},${lon}`
    const params = { q: query, days: '8' }

    console.log({ lat, lon })
    const queryString = new URLSearchParams(params).toString()
    url = `/api/forecast?${queryString}`
  }

  console.log({ url })
  const data = await fetch(url).then(r => r.json())
  return data
}
