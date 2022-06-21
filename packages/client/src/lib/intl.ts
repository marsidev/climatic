import type { TemperatureUnit, SpeedUnit, PressureUnit } from '@climatic/shared'
import i18n from 'i18next'

export const formatInt = (n: number): string => {
  const options: Intl.NumberFormatOptions = { maximumFractionDigits: 0 }

  const fomatter = new Intl.NumberFormat(i18n.language, options)
  const num = fomatter.format(n)
  return num
}

export const formatTemperature = (temperature: number, unit: TemperatureUnit): string => {
  const options: Intl.NumberFormatOptions = {
    style: 'unit',
    unit,
    maximumFractionDigits: 0
  }

  const fomatter = new Intl.NumberFormat(i18n.language, options)
  return fomatter.format(Math.round(temperature))
}

export const formatSpeed = (speed: number, unit: SpeedUnit): string => {
  let unitFormatted: string | undefined
  if (unit === 'kph') unitFormatted = 'kilometer-per-hour'
  if (unit === 'mph') unitFormatted = 'mile-per-hour'

  const options: Intl.NumberFormatOptions = {
    style: 'unit',
    unit: unitFormatted,
    unitDisplay: 'short'
  }

  const fomatter = new Intl.NumberFormat(i18n.language, options)
  return fomatter.format(Math.round(speed))
}

export const formatPressure = (pressure: number, unit: PressureUnit): string => {
  let unitFormatted: string | undefined
  if (unit === 'mb') unitFormatted = 'mb'
  if (unit === 'in') unitFormatted = 'inHg'

  const value = `${formatInt(Math.round(pressure))} ${unitFormatted}`
  return value
}

export const getDayName = (date: number | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    timeZone: 'UTC'
  }

  const fomatter = new Intl.DateTimeFormat(i18n.language, options)
  return fomatter.format(date)
}

export const getShortDate = (date: number | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC'
  }

  const fomatter = new Intl.DateTimeFormat(i18n.language, options)
  return fomatter.format(date)
}

export const getLargeDate = (date: number | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC'
  }

  const fomatter = new Intl.DateTimeFormat(i18n.language, options)
  return fomatter.format(date)
}
