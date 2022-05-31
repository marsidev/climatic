import type { ForecastState } from '@types'
import type { StoreSlice } from '.'
import { getForecast } from '@services'

export const forecast: StoreSlice<ForecastState> = (set, _get): ForecastState => ({
  forecastData: null,
  setForecastData(forecastData) {
    set(() => ({ forecastData }))
  },
  async getForecastData({ coords, locationStatus }) {
    return getForecast({ coords, locationStatus }).then(d => {
      console.log(d)
      set(() => ({ forecastData: d }))
      return d
    })
  }
})
