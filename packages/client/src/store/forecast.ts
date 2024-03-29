import type { ForecastState } from '@types'
import type { SliceCreator } from '.'
import { fetchForecastByCoords, fetchForecastByQuery } from '@services'
import { coordsToQuery } from '@lib'

export const forecast: SliceCreator<ForecastState> = (set, get) => ({
  fetching: false,

  forecastData: null,
  async getForecastDataByCoords() {
    const { coords, locationStatus, forecastQuery } = get()
    const coordsQuery = coordsToQuery(coords)

    set(() => ({ fetching: true }))

    const forecastData = await fetchForecastByCoords({ coords, locationStatus })
    if (!forecastData?.error) {
      set(() => ({
        forecastData,
        fetching: false,
        forecastQuery: coordsQuery ? coordsQuery : forecastQuery
      }))
    }

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
  }
})
