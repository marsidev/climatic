import type { UserState } from '@types'
import type { StoreSlice } from '.'
import { savePermissionToLocalStorage, getPermissionFromLocalStorage } from '@lib'

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
