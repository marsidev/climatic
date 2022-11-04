import type { PressureUnit, SpeedUnit, TemperatureUnit } from '@climatic/shared'
import type { GeoPermission } from '@types'
import {
	DEFAULT_PRESSURE_UNIT,
	DEFAULT_SPEED_UNIT,
	DEFAULT_TEMPERATURE_UNIT
} from './config'

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

export const saveTemperatureUnit = (unit: TemperatureUnit): void => {
	if (!unit) return
	window.localStorage.setItem('temperatureUnit', unit)
}

export const getTemperatureUnit = (): TemperatureUnit => {
	const unit = window.localStorage.getItem('temperatureUnit') as TemperatureUnit
	return unit ?? DEFAULT_TEMPERATURE_UNIT
}

export const saveSpeedUnit = (unit: SpeedUnit): void => {
	if (!unit) return
	window.localStorage.setItem('speedUnit', unit)
}

export const getSpeedUnit = (): SpeedUnit => {
	const unit = window.localStorage.getItem('speedUnit') as SpeedUnit
	return unit ?? DEFAULT_SPEED_UNIT
}

export const savePressureUnit = (unit: PressureUnit): void => {
	if (!unit) return
	window.localStorage.setItem('pressureUnit', unit)
}

export const getPressureUnit = (): PressureUnit => {
	const unit = window.localStorage.getItem('pressureUnit') as PressureUnit
	return unit ?? DEFAULT_PRESSURE_UNIT
}
