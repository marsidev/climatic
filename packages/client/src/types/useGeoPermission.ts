import type { Coordinates } from './useGeolocation'
export type GeoPermission = 'granted' | 'denied' | 'prompt' | null

export type LocationStatus = 'idle' | 'loading' | 'off' | 'not_supported' | 'error' | 'success' | 'denied' | null

export interface Location {
  isSupported: boolean | null
  coords: Coordinates | null
  status: LocationStatus
  grantPermission: () => void
  geoPermission: GeoPermission
}
