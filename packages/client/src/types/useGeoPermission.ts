/* eslint-disable no-undef */
export type GeoPermission = 'granted' | 'denied' | 'prompt'

export type GeoStatus = 'loading' | 'not_supported' | 'error' | 'success' | 'denied' | null

export type GeoPosition = number | null

export interface Location {
  isSupported: boolean | null
  coords: GeolocationCoordinates | null
  status: GeoStatus
  grantPermission: () => void
}
