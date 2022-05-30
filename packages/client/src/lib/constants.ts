/* eslint-disable no-undef */
interface Coordinates extends Pick<GeolocationCoordinates, 'latitude' | 'longitude'> { }

export const DEFAULT_LOCATION: Coordinates = {
  latitude: 41.38,
  longitude: 2.18
}
