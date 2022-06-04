import type { ForecastState } from '@types'
import type { StoreSlice } from '.'
import { fetchForecastByCoords, fetchForecastByQuery } from '@services'

export const forecast: StoreSlice<ForecastState> = (set, get): ForecastState => ({
  fetching: false,

  forecastData: null,
  setForecastData(forecastData) {
    set(() => ({ forecastData }))
  },
  async getForecastDataByCoords() {
    const { coords, locationStatus } = get()
    set(() => ({ fetching: true }))
    const forecastData = await fetchForecastByCoords({ coords, locationStatus })
    set(() => ({ forecastData, fetching: false }))
    return forecastData
  },
  async getForecastDataByQuery() {
    const { forecastQuery: query } = get()

    if (!query || query.includes('undefined')) return null

    set(() => ({ fetching: true }))
    const forecastData = await fetchForecastByQuery({ query })
    set(() => ({ forecastData, fetching: false }))
    return forecastData
  },

  forecastQuery: '',
  setForecastQuery(forecastQuery) {
    set(() => ({ forecastQuery }))
  },
  clearForecastQuery() {
    set(() => ({ forecastQuery: '' }))
  }
})
