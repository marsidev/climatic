import type { WeatherRequest } from '@types'
import type { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyPluginAsync } from 'fastify'
import { fetchSearchData } from '@lib'

export const search: FastifyPluginAsync = async (server: FastifyInstance, opts: FastifyPluginOptions) => {
  server.get('/', opts, async (request: WeatherRequest, reply: FastifyReply) => {
    const { query } = request
    const { q } = query

    const searchData = await fetchSearchData({ q })
    return reply.send(searchData)
  })
}
