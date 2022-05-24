export type GeoPermission = 'granted' | 'denied' | 'prompt'

export type GeoStatus = 'loading' | 'not_supported' | 'error' | 'success' | 'denied' | null

export type GeoPosition = number | null

export interface Geo {
  latitude: GeoPosition
  longitude: GeoPosition
  status: GeoStatus
  grantPermission: () => void
}

export * from '@server/types/responses'
