import type { ForecastRequest, RapidAPIForecastResponse } from '@types'
import type { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyPluginAsync } from 'fastify'
import { fetchForecastData, formatForecastData } from '@lib'
import dataLA from '@/mock_data/get-forecast-LA.json'
import dataBCN from '@/mock_data/get-forecast-BCN.json'

export const forecast: FastifyPluginAsync = async (server: FastifyInstance, opts: FastifyPluginOptions) => {
  server.get('/', opts, async (request: ForecastRequest, reply: FastifyReply) => {
    const { query } = request
    const { q = 'Los Angeles', original = '0', days = 3 } = query

    let forecastData: RapidAPIForecastResponse
    if (q === 'mock_LA') {
      forecastData = dataLA as RapidAPIForecastResponse
    } else if (q === 'mock_BCN') {
      forecastData = dataBCN as RapidAPIForecastResponse
    } else {
      forecastData = await fetchForecastData({ q, days })
    }

    if (original === '1') {
      return reply.send(forecastData)
    }

    const data = formatForecastData(forecastData)
    return reply.send(data)
  })
}
