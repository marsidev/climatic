export const formatTemperature = (temperature: number, unit: 'celsius' | 'farenheit'): string => {
  const fomatter = new Intl.NumberFormat('es-ES', { style: 'unit', unit })
  const _temperature = fomatter.format(temperature)
  return _temperature
}

export const formatNumber = (n: number): number => {
  const fomatter = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 0 })
  const _n = fomatter.format(n)
  return Number(_n)
}
