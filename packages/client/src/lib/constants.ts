import type { Coordinates, GeoPositionOptions } from '@types'

export const SHOW_MOCK_DATA_ON_DEV = true

export const DEFAULT_LOCATION: Coordinates = {
  latitude: 41.3879,
  longitude: 2.1699
}

export const DEFAULT_GEO_OPTIONS: GeoPositionOptions = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 6000000
}

export const DISABLED_TIMEOUT: number = 1000
