import type { RapidAPIWeatherResponse, RapidAPIForecastResponse, RapidApiRequestQuery } from '@types'

import { FETCH_OPTIONS, API_URL } from '@lib/constants'
import { fillNextForecastDays } from '@lib/dailyForecast'

export const fetchWeatherData = async (props: RapidApiRequestQuery): Promise<RapidAPIWeatherResponse> => {
  const { q, days = 3, lang = 'es' }: RapidApiRequestQuery = props

  const params = { q, days: days.toString(), lang }
  const queryString = new URLSearchParams(params).toString()
  const url = `${API_URL}/current.json?${queryString}`

  const response = await fetch(url, FETCH_OPTIONS)
  const data: RapidAPIWeatherResponse = await response.json()
  return data
}

export const fetchForecastData = async (props: RapidApiRequestQuery): Promise<RapidAPIForecastResponse> => {
  const { q, days = 3, lang = 'es' }: RapidApiRequestQuery = props

  const params = { q, days: days.toString(), lang }
  const queryString = new URLSearchParams(params).toString()
  const url = `${API_URL}/forecast.json?${queryString}`

  const response = await fetch(url, FETCH_OPTIONS)
  const _data: RapidAPIForecastResponse = await response.json()

  const data = fillNextForecastDays(_data, { q, days, lang })

  return data
}
