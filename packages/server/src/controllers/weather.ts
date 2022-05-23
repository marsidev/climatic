import 'isomorphic-fetch'
import { WeatherRequest } from '@types'
import { FastifyInstance, FastifyPluginOptions, FastifyReply } from 'fastify'
import { formatData, getData } from '@lib/weather'

export const getWeather = async (server: FastifyInstance, opts: FastifyPluginOptions) => {
  server.get('/', opts, async (request: WeatherRequest, reply: FastifyReply) => {
    const { query } = request
    const {
      q = 'Los Angeles',
      original = '0'
    } = query

    const weatherData = await getData({ q })

    if (original === '1') {
      return reply.send(weatherData)
    }

    const data = formatData(weatherData)
    return reply.send(data)
  })
}

export default getWeather
