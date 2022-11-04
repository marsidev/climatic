import type { PressureUnit, SpeedUnit, TemperatureUnit } from '@climatic/shared'
import type { UserState } from '@types'
import type { StoreSlice } from '.'
import {
	getPermissionFromLocalStorage,
	getPressureUnit,
	getSpeedUnit,
	getTemperatureUnit,
	savePermissionToLocalStorage,
	savePressureUnit,
	saveSpeedUnit,
	saveTemperatureUnit
} from '@lib/localStorage'

export const user: StoreSlice<UserState> = (set, get): UserState => ({
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
