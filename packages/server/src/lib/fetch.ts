import type {
	RapidAPIForecastResponse,
	RapidAPISearchResponse,
	RapidAPIWeatherResponse,
	RapidApiRequestQuery
} from '../types'
import { DEFAULT_LOCALE } from '@climatic/shared'
import { fillNextForecastDays } from './dailyForecast'
import config from './config'

const { FETCH_OPTIONS, API_URL } = config

export const fetchWeatherData = async (props: RapidApiRequestQuery): Promise<RapidAPIWeatherResponse> => {
	const { q, days = 3, lang = DEFAULT_LOCALE }: RapidApiRequestQuery = props

	const params = { q, days: days.toString(), lang }
	const queryString = new URLSearchParams(params).toString()
	const url = `${API_URL}/current.json?${queryString}`

	const response = await fetch(url, FETCH_OPTIONS)
	const data: RapidAPIWeatherResponse = await response.json()
	return data
}

export const fetchForecastData = async (props: RapidApiRequestQuery): Promise<RapidAPIForecastResponse> => {
	const { q, days = 3, lang = DEFAULT_LOCALE }: RapidApiRequestQuery = props

	const params = { q, days: days.toString(), lang }
	const queryString = new URLSearchParams(params).toString()
	const url = `${API_URL}/forecast.json?${queryString}`

	const response = await fetch(url, FETCH_OPTIONS)
	const forecastData: RapidAPIForecastResponse = await response.json()

	if (forecastData.error) {
		return forecastData
	}

	const forecastFilled = await fillNextForecastDays(forecastData, {
		q,
		days,
		lang
	})

	return forecastFilled
}

export const fetchDayForecastData = async (props: RapidApiRequestQuery): Promise<RapidAPIForecastResponse> => {
	const { q, dt = '', lang = DEFAULT_LOCALE } = props

	const params = { q, dt, lang }
	const queryString = new URLSearchParams(params).toString()
	const url = `${API_URL}/forecast.json?${queryString}`

	const response = await fetch(url, FETCH_OPTIONS)
	const data: RapidAPIForecastResponse = await response.json()
	return data
}

export const fetchSearchData = async (props: RapidApiRequestQuery): Promise<RapidAPISearchResponse> => {
	const { q } = props

	const params = { q }
	const queryString = new URLSearchParams(params).toString()
	const url = `${API_URL}/search.json?${queryString}`

	const response = await fetch(url, FETCH_OPTIONS)
	const data: RapidAPISearchResponse = await response.json()
	return data
}
