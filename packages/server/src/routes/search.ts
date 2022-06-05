import type { WeatherRequest } from '@types'
import type { FastifyPluginAsync } from 'fastify'
import { fetchSearchData, formatQuery } from '@lib'
import '@climatic/shared'

export const search: FastifyPluginAsync = async (server, opts) => {
  server.get('/search', opts, async (request: WeatherRequest, reply) => {
    const { query } = request
    const { q } = query

    const searchData = await fetchSearchData({ q: formatQuery(q) })
    return reply.send(searchData)
  })
}

export default search
