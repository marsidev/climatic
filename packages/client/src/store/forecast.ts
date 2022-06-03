import type { ForecastState } from '@types'
import type { StoreSlice } from '.'
import { fetchForecastByCoords, fetchForecastByQuery } from '@services'

export const forecast: StoreSlice<ForecastState> = (set, get): ForecastState => ({
  forecastData: null,
  setForecastData(forecastData) {
    set(() => ({ forecastData }))
  },
  async getForecastDataByCoords() {
    const { coords, locationStatus } = get()
    return fetchForecastByCoords({ coords, locationStatus }).then(d => {
      set(() => ({ forecastData: d }))
      return d
    })
  },
  async getForecastDataByQuery() {
    const { forecastQuery: query } = get()
    return fetchForecastByQuery({ query }).then(d => {
      set(() => ({ forecastData: d }))
      return d
    })
  },
  async updateForecastData() {
    const { forecastQuery } = get()

    if (!forecastQuery) return null
    if (forecastQuery.includes('undefined')) return null

    return fetchForecastByQuery({ query: forecastQuery }).then(d => {
      set(() => ({ forecastData: d }))
      return d
    })
  },

  forecastQuery: '',
  setForecastQuery(forecastQuery) {
    set(() => ({ forecastQuery }))
  },
  clearForecastQuery() {
    set(() => ({ forecastQuery: '' }))
  }
})
