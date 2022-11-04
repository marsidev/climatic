import type { ForecastResponse } from '~/../../packages/shared'
import { beforeAll, describe, expect, it } from 'vitest'
import { WeatherTemperature } from '@components'
import { fetchForecastByQuery } from '@services'
import { formatTemperature } from '@lib/intl'
import { cleanup, render, resetDom } from '../helpers'

let forecast: ForecastResponse

beforeAll(async () => {
	resetDom()
	cleanup()
	const data = await fetchForecastByQuery({ query: 'New York', lang: 'es' })
	render(<WeatherTemperature data={data} py='48px' />)
	forecast = data
})

describe.concurrent('<WeatherTemperature />', () => {
	it('has element #temperature', () => {
		const el = document.querySelector('#temperature')
		expect(el).toBeTruthy()
	})

	it('shows expected temperature', () => {
		const { currentWeather: w } = forecast
		const temperature = formatTemperature(w.temperature.celsius, 'celsius')

		const el = document.querySelector('#temperature')
		const text = el?.textContent
		expect(text).toBe(temperature)
	})

	it('shows expected feelsLike temperature', () => {
		const { currentWeather: w } = forecast
		const feelsLike = formatTemperature(w.feelsLike.celsius, 'celsius')

		const text = document.querySelector('#feels-like')?.textContent
		expect(text).toBe(`Sensación térmica de ${feelsLike}`)
	})
})
