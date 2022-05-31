/* eslint-disable no-undef */
import type { ForecastResponse } from '@climatic/shared'
import type { GetForecast } from '@services'

export interface Coordinates extends Pick<GeolocationCoordinates, 'latitude' | 'longitude'> { }

export type GeoPermission = 'granted' | 'denied' | 'prompt' | null

export type LocationStatus = 'idle' | 'loading' | 'off' | 'not_supported' | 'error' | 'success' | 'denied' | null

export interface GeolocationState {
  loading: boolean
  setLoading: (loading: boolean) => void

  isSupported: boolean | null
  setIsSupported: (isSupported: boolean) => void

  coords: Coordinates | null
  setCoords: (coords: Coordinates) => void
  getCoords: () => void

  timestamp: number | null
  setTimestamp: (timestamp: number) => void

  error: GeolocationPositionError | null
  setError: (error: GeolocationPositionError | null) => void

  locationStatus: LocationStatus
  setLocationStatus: (locationStatus: LocationStatus) => void
}

export interface UserState {
  permission: GeoPermission
  setPermission: (permission: GeoPermission) => void
  grantPermission: () => void

  localStorageReaded: boolean
  setLocalStorageReaded: (localStorageReaded: boolean) => void
  initLocalStorage: () => void
}

export interface ForecastState {
  forecastData: ForecastResponse | null
  setForecastData: (forecastData: ForecastResponse) => void
  getForecastData: ({ coords, locationStatus }: GetForecast) => Promise<ForecastResponse>
}
