import type { GeoPermission } from '@types'

export const savePermissionToLocalStorage = (permission: GeoPermission): void => {
  if (!permission) return

  window.localStorage.setItem('geoPermission', permission)
}

export const getPermissionFromLocalStorage = (): GeoPermission => {
  const permission = window.localStorage.getItem('geoPermission')
  if (permission === 'granted' || permission === 'denied') {
    return permission
  }

  return 'prompt'
}
