/* eslint-disable no-undef */

export interface useGeolocationProps {
  loading: boolean
  isSupported: boolean | null
  coords: GeolocationCoordinates | null
  timestamp: number | null
  error?: GeolocationPositionError | null
}

export interface GeolocationOptions extends PositionOptions {
  enabled?: boolean
}
