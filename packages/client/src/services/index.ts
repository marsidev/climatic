import type { ForecastResponse } from '@types'

export const getForecast = async (): Promise<ForecastResponse> => {
  const url = '/api/forecast?days=8'
  const data = await fetch(url).then(r => r.json())
  return data
}
