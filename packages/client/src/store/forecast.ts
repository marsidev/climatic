import type { StoreSlice } from '.'
import type { ForecastResponse } from '@climatic/shared'
import { getForecast, GetForecast } from '@services'

export interface ForecastState {
  forecastData: ForecastResponse | null
  setForecastData: (forecastData: ForecastResponse) => void
  getForecastData: ({ coords, locationStatus }: GetForecast) => Promise<ForecastResponse>
}

export const forecast: StoreSlice<ForecastState> = (set, _get): ForecastState => ({
  forecastData: null,
  setForecastData(forecastData) {
    set(() => ({ forecastData }))
  },
  async getForecastData({ coords, locationStatus }) {
    return getForecast({ coords, locationStatus }).then(d => {
      console.log(d)
      set(() => ({ forecastData: d }))
      // document.title = d.location.name
      return d
    })
  }
})
