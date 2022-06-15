import type { ForecastResponse } from '@climatic/shared'
import type { RenderResult } from '@testing-library/react'

import { beforeAll, describe, expect, it } from 'vitest'
import { render, resetDom } from '../helpers'
import { WeatherTemperature } from '@components'
import { fetchForecastByQuery } from '@services'
import { formatTemperature } from '@lib/intl'

let dom: RenderResult
let forecast: ForecastResponse

beforeAll(async () => {
  resetDom()
  const data = await fetchForecastByQuery({ query: 'New York' })
  dom = render(<WeatherTemperature data={data} py='48px' />)
  forecast = data
})

describe.concurrent('<WeatherTemperature />', () => {
  it('has element #temperature', () => {
    const { container } = dom
    const el = container.querySelector('#temperature')
    expect(el).toBeTruthy()
  })

  it('shows expected temperature', () => {
    const { container } = dom

    const { currentWeather: w } = forecast
    const temperature = formatTemperature(w.temperature.celsius, 'celsius')

    const el = container.querySelector('#temperature')
    const text = el?.textContent
    expect(text).toBe(temperature)
  })

  it('shows expected feelsLike temperature', () => {
    const { container } = dom

    const { currentWeather: w } = forecast
    const feelsLike = formatTemperature(w.feelsLike.celsius, 'celsius')

    const text = container.querySelector('#feels-like')?.textContent
    expect(text).toBe(`Sensación térmica de ${feelsLike}`)
  })
})
