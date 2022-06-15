import type { TemperatureUnit, SpeedUnit, PressureUnit, Language, Dictionary } from '@climatic/shared'
import type { GeoPositionOptions } from '@types'

export const mode = import.meta.env.VITE_ENV_TYPE
export const environment = process.env.NODE_ENV

export const IS_PROD = mode === 'prod' || environment === 'production'
export const IS_DEV = mode === 'dev'
export const IS_TEST = mode === 'test'

export const SHOW_MOCK_DATA_ON_DEV: boolean = false

export const SHOW_MOCK: boolean = SHOW_MOCK_DATA_ON_DEV && IS_DEV

export const DEFAULT_QUERY: string = 'barcelona-spain'

export const DEFAULT_FORECAST_DAYS = '8'

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

export const ASSETS_URL = IS_PROD ? '/server-assets' : '/src/assets'

export const API_URL = IS_TEST ? 'http://localhost:3001/api' : '/api'

export default {
  IS_PROD,
  IS_DEV,
  IS_TEST,
  SHOW_MOCK_DATA_ON_DEV,
  DEFAULT_QUERY,
  DEFAULT_FORECAST_DAYS,
  DEFAULT_GEO_OPTIONS,
  DEFAULT_LANGUAGE,
  DEFAULT_TEMPERATURE_UNIT,
  DEFAULT_SPEED_UNIT,
  DEFAULT_PRESSURE_UNIT,
  DISABLED_TIMEOUT,
  MOON_PHASES_ES,
  ASSETS_URL,
  API_URL
}
