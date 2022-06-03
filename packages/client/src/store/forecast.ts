import type { ForecastState } from '@types'
import type { StoreSlice } from '.'
import { fetchForecastByCoords, fetchForecastByQuery } from '@services'

export const forecast: StoreSlice<ForecastState> = (set, get): ForecastState => ({
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
  },
  async updateForecastData() {
    const { forecastQuery } = get()
    if (!forecastQuery) return null

    // console.log('update forecast data for q=' + forecastQuery + ' at ' + new Date().toISOString())

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
