import type { Locale } from '@climatic/shared'
import type { ForecastRequest } from '@types'
import type { FastifyPluginAsync } from 'fastify'

import { fetchForecastData, formatForecastData, formatQuery } from '@lib'

export const forecast: FastifyPluginAsync = async (server, opts) => {
  server.get('/forecast', opts, async (request: ForecastRequest, reply) => {
    const { query } = request
    const { q = 'Los Angeles', original = '0', days = 3 } = query
    const lang = query.lang as Locale

    let forecastData: any
    if (q === 'mock-la') {
      forecastData = require('@/mock_data/forecast-la.json')
    } else if (q === 'mock-bcn') {
      forecastData = require('@/mock_data/forecast-bcn.json')
    } else {
      forecastData = await fetchForecastData({ q: formatQuery(q), days, lang })
    }

    if (forecastData.error) {
      return reply.code(500).send(forecastData)
    }

    if (original === '1') {
      return reply.send(forecastData)
    }

    const data = formatForecastData(forecastData)
    return reply.send(data)
  })
}

export default forecast
