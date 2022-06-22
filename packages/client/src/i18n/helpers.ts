export const getWeatherConditionTranslationKey = (id: number, isDay: boolean) => {
  const prefix = isDay ? 'day' : 'night'
  const conditionKey = `${prefix}-${id}`
  const translationKey = `conditions.${prefix}.${conditionKey}`
  return translationKey
}
