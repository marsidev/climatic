import type { FastifyInstance } from 'fastify'
import { ping, getWeather, getForecast } from '@controllers/index'

const routing = (server: FastifyInstance): void => {
  const { register } = server
  register(ping, { prefix: '/api/ping' })
  register(getWeather, { prefix: '/api/weather' })
  register(getForecast, { prefix: '/api/forecast' })

  server.after(err => err ? console.log(err) : console.log('Routes are ready.'))
}

export default routing
