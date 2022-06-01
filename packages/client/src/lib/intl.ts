import type { TemperatureUnit, SpeedUnit } from '@climatic/shared'

const locale: string = 'es-ES'

export const formatInt = (n: number): number => {
  const options: Intl.NumberFormatOptions = { maximumFractionDigits: 0 }

  const fomatter = new Intl.NumberFormat(locale, options)
  const num = fomatter.format(n)
  return Number(num)
}

export const formatTemperature = (temperature: number, unit: TemperatureUnit): string => {
  const options: Intl.NumberFormatOptions = { style: 'unit', unit }

  const fomatter = new Intl.NumberFormat(locale, options)
  return fomatter.format(formatInt(temperature))
}

export const formatSpeed = (speed: number, unit: SpeedUnit): string => {
  let unitFormatted: string | undefined
  if (unit === 'kph') unitFormatted = 'kilometer-per-hour'
  if (unit === 'mph') unitFormatted = 'mile-per-hour'

  const options: Intl.NumberFormatOptions = { style: 'unit', unit: unitFormatted, unitDisplay: 'short' }

  const fomatter = new Intl.NumberFormat(locale, options)
  return fomatter.format(formatInt(speed))
}

export const getDayName = (date: number | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    timeZone: 'UTC'
  }

  const fomatter = new Intl.DateTimeFormat(locale, options)
  return fomatter.format(date)
}

export const getShortDate = (date: number | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC'
  }

  const fomatter = new Intl.DateTimeFormat(locale, options)
  return fomatter.format(date)
}

export const getLargeDate = (date: number | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC'
  }

  const fomatter = new Intl.DateTimeFormat(locale, options)
  return fomatter.format(date)
}
