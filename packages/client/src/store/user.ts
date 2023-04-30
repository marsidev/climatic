import type { TemperatureUnit, SpeedUnit, PressureUnit } from '@climatic/shared'
import type { UserState } from '@types'
import type { SliceCreator } from '.'
import { savePermissionToLocalStorage, getPermissionFromLocalStorage, getTemperatureUnit, getPressureUnit, getSpeedUnit, savePressureUnit, saveSpeedUnit, saveTemperatureUnit } from '@lib/localStorage'

export const user: SliceCreator<UserState> = (set, get) => ({
  permission: null,
  grantPermission() {
    set(() => ({ permission: 'granted' }))
    savePermissionToLocalStorage('granted')
  },

  temperatureUnit: getTemperatureUnit(),
  switchTemperatureUnit() {
    const prev: TemperatureUnit = get().temperatureUnit
    const next: TemperatureUnit = prev === 'celsius' ? 'fahrenheit' : 'celsius'
    set(() => ({ temperatureUnit: next }))
    saveTemperatureUnit(next)
  },

  speedUnit: getSpeedUnit(),
  switchSpeedUnit() {
    const prev: SpeedUnit = get().speedUnit
    const next: SpeedUnit = prev === 'kph' ? 'mph' : 'kph'
    set(() => ({ speedUnit: next }))
    saveSpeedUnit(next)
  },

  pressureUnit: getPressureUnit(),
  switchPressureUnit() {
    const prev: PressureUnit = get().pressureUnit
    const next: PressureUnit = prev === 'mb' ? 'in' : 'mb'
    set(() => ({ pressureUnit: next }))
    savePressureUnit(next)
  },

  localStorageReaded: false,
  initLocalStorage() {
    const permission = getPermissionFromLocalStorage()

    set(() => ({
      permission,
      localStorageReaded: true
    }))
  }
})
