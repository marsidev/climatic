/* eslint-disable no-undef */
export interface Coordinates extends Pick<GeolocationCoordinates, 'latitude' | 'longitude'> { }

export interface useGeolocationProps {
  loading: boolean
  isSupported: boolean | null
  coords: Coordinates | null
  timestamp: number | null
  error?: GeolocationPositionError | null
}

export interface GeolocationOptions extends PositionOptions {
  enabled?: boolean
}
