/* eslint-disable no-undef */
import type {
  ForecastResponse,
  TemperatureUnit,
  SpeedUnit,
  PressureUnit
} from '@climatic/shared'

export interface Coordinates extends Pick<GeolocationCoordinates, 'latitude' | 'longitude'> { }

export type GeoPermission = 'granted' | 'denied' | 'prompt' | null

export type LocationStatus = 'idle' | 'loading' | 'off' | 'not_supported' | 'error' | 'success' | 'denied' | null

export interface GeoPositionOptions extends PositionOptions { }

export interface GeoPosition extends GeolocationPosition { }

export interface GeoPositionError extends GeolocationPositionError { }

export interface GeolocationState {
  loading: boolean
  isSupported: boolean | null
  coords: Coordinates | null
  getCoords: () => Promise<Coordinates | null>
  timestamp: number | null
  error: GeolocationPositionError | null
  locationStatus: LocationStatus
}

export interface UserState {
  permission: GeoPermission
  grantPermission: () => void

  temperatureUnit: TemperatureUnit
  switchTemperatureUnit: () => void

  speedUnit: SpeedUnit
  switchSpeedUnit: () => void

  pressureUnit: PressureUnit
  switchPressureUnit: () => void

  localStorageReaded: boolean
  initLocalStorage: () => void
}

export interface ForecastState {
  fetching: boolean

  forecastData: ForecastResponse | null
  getForecastDataByCoords: () => Promise<any>
  getForecastDataByQuery: () => Promise<any>

  forecastQuery: string
  setForecastQuery: (forecastQuery: string) => void
}
