import type { WeatherRequest } from '@types'
import type { FastifyInstance, FastifyPluginOptions, FastifyReply } from 'fastify'
import { formatData, fetchWeatherData } from '@lib/weather'

export const getWeather = async (server: FastifyInstance, opts: FastifyPluginOptions) => {
  server.get('/', opts, async (request: WeatherRequest, reply: FastifyReply) => {
    const { query } = request
    const { q = 'Los Angeles', original = '0' } = query

    const weatherData = await fetchWeatherData({ q })

    if (original === '1') {
      return reply.send(weatherData)
    }

    const data = formatData(weatherData)
    return reply.send(data)
  })
}

export default getWeather
