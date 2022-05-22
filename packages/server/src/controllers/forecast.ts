import { ForecastRequest } from '@types'
import { FastifyInstance, FastifyPluginOptions, FastifyReply } from 'fastify'
import { formatData, getData } from '@lib/forecast'

export const getForecast = async (server: FastifyInstance, opts: FastifyPluginOptions) => {
  server.get('/', opts, async (request: ForecastRequest, reply: FastifyReply) => {
    const { query } = request
    const {
      q = 'Los Angeles',
      original = '0'
    } = query

    const forecastData = await getData(q)

    if (original === '1') {
      return reply.send(forecastData)
    }

    const data = formatData(forecastData)
    return reply.send(data)
  })
}

export default getForecast
