import type { GeoPermission } from '@types'
import type { StoreSlice } from '.'
import { savePermissionToLocalStorage, getPermissionFromLocalStorage } from '@lib'

export interface UserState {
  permission: GeoPermission
  setPermission: (permission: GeoPermission) => void
  grantPermission: () => void

  localStorageReaded: boolean
  setLocalStorageReaded: (localStorageReaded: boolean) => void
  initLocalStorage: () => void
}

export const user: StoreSlice<UserState> = (set, _get): UserState => ({
  permission: null,
  setPermission(permission) {
    set(() => ({ permission }))
  },
  grantPermission() {
    set(() => ({ permission: 'granted' }))
    savePermissionToLocalStorage('granted')
  },

  localStorageReaded: false,
  setLocalStorageReaded(localStorageReaded) {
    set(() => ({ localStorageReaded }))
  },
  initLocalStorage() {
    const permission = getPermissionFromLocalStorage()
    set(() => ({
      permission,
      localStorageReaded: true
    }))
  }
})
