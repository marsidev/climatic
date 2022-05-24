const locale: string = 'es-ES'

export const formatInt = (n: number): number => {
  const options: Intl.NumberFormatOptions = { maximumFractionDigits: 0 }

  const fomatter = new Intl.NumberFormat(locale, options)
  const num = fomatter.format(n)
  return Number(num)
}

export const formatTemperature = (temperature: number, unit: 'celsius' | 'farenheit'): string => {
  const options: Intl.NumberFormatOptions = { style: 'unit', unit }

  const fomatter = new Intl.NumberFormat(locale, options)
  return fomatter.format(formatInt(temperature))
}

export const getDayName = (date: number | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    timeZone: 'UTC'
  }

  const fomatter = new Intl.DateTimeFormat(locale, options)
  return fomatter.format(date)
}
