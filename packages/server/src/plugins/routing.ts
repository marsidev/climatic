import type { FastifyInstance } from 'fastify'
import { ping, getWeather, getForecast } from '@controllers/index'

export const routing = (server: FastifyInstance): void => {
  const { register } = server
  register(ping, { prefix: '/api/ping' })
  register(getWeather, { prefix: '/api/weather' })
  register(getForecast, { prefix: '/api/forecast' })
}

export default routing
