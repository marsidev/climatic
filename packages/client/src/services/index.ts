// import { ForecastResponse } from '@types'

export const getForecast = async () => {
  // const data: ForecastResponse = await fetch('/api/get-forecast').then(r => r.json())
  const data = await fetch('/api/get-forecast').then(r => r.json())
  return data
}
