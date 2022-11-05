/* eslint-disable no-await-in-loop */
import type { RapidAPIForecastResponse, RapidApiRequestQuery } from '../types'
import { fetchDayForecastData } from './fetch'

const OneDayInSeconds = 86400
const MAX_FORECAST_DAYS = 8

export const fillNextForecastDays = async (
	data: RapidAPIForecastResponse,
	params: RapidApiRequestQuery
): Promise<RapidAPIForecastResponse> => {
	let { days } = params
	days = Number(days) > MAX_FORECAST_DAYS ? MAX_FORECAST_DAYS : Number(days)

	const forecastCount = data.forecast.forecastday.length
	const daysToFill = days - forecastCount

	for (let i = 0; i < daysToFill; i++) {
		const tempForecast = data.forecast.forecastday
		const lastForecastTime = tempForecast[tempForecast.length - 1].date_epoch

		if (lastForecastTime) {
			const nextForecastTime = (lastForecastTime + OneDayInSeconds) * 1000
			const nextForecastDate = new Date(nextForecastTime).toISOString()
			const dt = nextForecastDate.substring(0, 10)
			const nextForecast = await fetchDayForecastData({ ...params, dt })
			const nextForecastData = nextForecast.forecast.forecastday[0]
			data.forecast.forecastday.push(nextForecastData)
		}
	}

	return data
}
