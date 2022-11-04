import type { Coordinates, LocationStatus } from '@types'
import type { ForecastResponse, Locale } from '@climatic/shared'
import {
	API_URL,
	DEFAULT_FORECAST_DAYS,
	DEFAULT_QUERY,
	SHOW_MOCK
} from '@lib/config'

export interface GetForecastByCoords {
	coords: Coordinates | null
	locationStatus: LocationStatus
	lang?: Locale
}

export interface GetForecastByQuery {
	query: string
	lang?: Locale
}

export const fetchForecastByCoords = async ({ coords, locationStatus }: GetForecastByCoords): Promise<ForecastResponse> => {
	const { latitude, longitude } = coords ?? {}

	const noCoords: boolean = !latitude && !longitude
	const noGeo: boolean = locationStatus === 'denied' || locationStatus === 'not_supported' || locationStatus === 'error'
	const withGeo = !noGeo && !noCoords

	let query = ''
	if (SHOW_MOCK && withGeo) query = '{{mock-la}}'
	if (SHOW_MOCK && !withGeo) query = '{{mock}}'
	if (!SHOW_MOCK && withGeo) query = `${latitude},${longitude}`
	if (!SHOW_MOCK && !withGeo) query = DEFAULT_QUERY

	const params = { q: query, days: DEFAULT_FORECAST_DAYS }
	const queryString = new URLSearchParams(params).toString()
	const url = `${API_URL}/forecast?${queryString}`

	return fetch(url)
		.then(r => r.json())
		.catch(console.error)
}

export const fetchForecastByQuery = async ({ query }: GetForecastByQuery): Promise<ForecastResponse> => {
	const params = { q: query, days: DEFAULT_FORECAST_DAYS }
	const queryString = new URLSearchParams(params).toString()
	const url = `${API_URL}/forecast?${queryString}`

	return fetch(url)
		.then(r => r.json())
		.catch(console.error)
}
