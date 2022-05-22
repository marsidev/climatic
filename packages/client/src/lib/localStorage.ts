import type { GeoPermission } from '@types'

export const saveGeoPermission = (permission: GeoPermission): void => {
  window.localStorage.setItem('geoPermission', permission)
}

export const getGeoPermission = (): GeoPermission => {
  const permission = window.localStorage.getItem('geoPermission')
  if (permission === 'granted' || permission === 'denied') {
    return permission
  }

  return 'prompt'
}
