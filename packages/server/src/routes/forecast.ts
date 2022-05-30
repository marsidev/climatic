import type { ForecastRequest } from '@types'
import type { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyPluginAsync } from 'fastify'
import { fetchForecastData, formatForecastData } from '@lib'

export const forecast: FastifyPluginAsync = async (server: FastifyInstance, opts: FastifyPluginOptions) => {
  server.get('/', opts, async (request: ForecastRequest, reply: FastifyReply) => {
    const { query } = request
    const { q = 'Los Angeles', original = '0', days = 3 } = query

    const forecastData = await fetchForecastData({ q, days })

    if (original === '1') {
      return reply.send(forecastData)
    }

    const data = formatForecastData(forecastData)
    return reply.send(data)
  })
}
