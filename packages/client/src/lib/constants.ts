import type { TemperatureUnit, SpeedUnit } from '@climatic/shared'
import type { Coordinates, GeoPositionOptions } from '@types'

export const SHOW_MOCK_DATA_ON_DEV = false

export const DEFAULT_LOCATION: Coordinates = {
  latitude: 41.3879,
  longitude: 2.1699
}

export const DEFAULT_GEO_OPTIONS: GeoPositionOptions = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 6000000
}

export const DEFAULT_TEMPERATURE_UNIT: TemperatureUnit = 'celsius'

export const DEFAULT_SPEED_UNIT: SpeedUnit = 'kph'

export const DISABLED_TIMEOUT: number = 1000

export const ASSETS_URL =
  process.env.NODE_ENV === 'development'
    ? '/src/assets'
    : '/server-assets'
