import forecast from './api/forecast'
import search from './api/search'

export const handlers = [...forecast, ...search]
