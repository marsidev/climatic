import type { TemperatureUnit, SpeedUnit, PressureUnit, Language, Dictionary } from '@climatic/shared'
import type { Coordinates, GeoPositionOptions } from '@types'

export const SHOW_MOCK_DATA_ON_DEV = false

export const DEFAULT_LOCATION: Coordinates = {
  latitude: 41.38,
  longitude: 2.18
}

export const DEFAULT_GEO_OPTIONS: GeoPositionOptions = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 6000000
}

export const DEFAULT_LANGUAGE: Language = 'es-ES'

export const DEFAULT_TEMPERATURE_UNIT: TemperatureUnit = 'celsius'

export const DEFAULT_SPEED_UNIT: SpeedUnit = 'kph'

export const DEFAULT_PRESSURE_UNIT: PressureUnit = 'mb'

export const DISABLED_TIMEOUT: number = 1000

export const MOON_PHASES_ES: Dictionary = {
  'New Moon': 'Luna nueva',
  'Waxing Crescent': 'Cuarto creciente',
  'First Quarter': 'Primer cuarto',
  'Waxing Gibbous': 'Luna creciente',
  'Full Moon': 'Luna llena',
  'Waning Gibbous': 'Luna menguante',
  'Last Quarter': 'Último cuarto',
  'Waning Crescent': 'Cuarto menguante'
}

export const ASSETS_URL =
  process.env.NODE_ENV === 'development'
    ? '/src/assets'
    : '/server-assets'
