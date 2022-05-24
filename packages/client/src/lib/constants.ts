import type { GeoPosition } from '@types'

interface Location {
  latitude: GeoPosition
  longitude: GeoPosition
}

export const DEFAULT_LOCATION: Location = {
  latitude: 41.38,
  longitude: 2.18
}
