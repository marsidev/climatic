/* eslint-disable no-undef */
import type { ForecastResponse } from '@climatic/shared'

export interface Coordinates extends Pick<GeolocationCoordinates, 'latitude' | 'longitude'> { }

export type GeoPermission = 'granted' | 'denied' | 'prompt' | null

export type LocationStatus = 'idle' | 'loading' | 'off' | 'not_supported' | 'error' | 'success' | 'denied' | null

export interface GeoPositionOptions extends PositionOptions { }

export interface GeoPosition extends GeolocationPosition { }

export interface GeoPositionError extends GeolocationPositionError { }

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
  fetching: boolean

  forecastData: ForecastResponse | null
  setForecastData: (forecastData: ForecastResponse | null) => void
  getForecastDataByCoords: () => Promise<any>
  getForecastDataByQuery: () => Promise<any>

  forecastQuery: string
  setForecastQuery: (forecastQuery: string) => void
  clearForecastQuery: () => void
}
