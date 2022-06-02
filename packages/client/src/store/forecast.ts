import type { ForecastState } from '@types'
import type { StoreSlice } from '.'
import { fetchForecastByCoords, fetchForecastByQuery } from '@services'

export const forecast: StoreSlice<ForecastState> = (set, _get): ForecastState => ({
  forecastData: null,
  setForecastData(forecastData) {
    set(() => ({ forecastData }))
  },
  async getForecastDataByCoords({ coords, locationStatus }) {
    return fetchForecastByCoords({ coords, locationStatus }).then(d => {
      console.log(d)
      set(() => ({ forecastData: d }))
      return d
    })
  },
  async getForecastDataByQuery({ query }) {
    return fetchForecastByQuery({ query }).then(d => {
      console.log(d)
      set(() => ({ forecastData: d }))
      return d
    })
  }
})
