import type { WeatherRequest } from '@types'
import type { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyPluginAsync } from 'fastify'
import { fetchWeatherData, formatWeatherData } from '@lib'

export const weather: FastifyPluginAsync = async (server: FastifyInstance, opts: FastifyPluginOptions) => {
  server.get('/', opts, async (request: WeatherRequest, reply: FastifyReply) => {
    const { query } = request
    const { q = 'Los Angeles', original = '0' } = query

    const weatherData = await fetchWeatherData({ q })

    if (original === '1') {
      return reply.send(weatherData)
    }

    const data = formatWeatherData(weatherData)
    return reply.send(data)
  })
}
