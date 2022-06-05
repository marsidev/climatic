import type { WeatherRequest } from '@types'
import type { FastifyPluginAsync } from 'fastify'
import { fetchSearchData } from '@lib'

export const search: FastifyPluginAsync = async (server, opts) => {
  server.get('/search', opts, async (request: WeatherRequest, reply) => {
    const { query } = request
    const { q } = query

    const searchData = await fetchSearchData({ q })
    return reply.send(searchData)
  })
}

export default search
