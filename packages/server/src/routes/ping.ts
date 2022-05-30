import type { Ping } from '@types'
import type { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest, FastifyPluginAsync } from 'fastify'

export const ping: FastifyPluginAsync = async (server: FastifyInstance, opts: FastifyPluginOptions) => {
  server.get('/', opts, async (_request: FastifyRequest, reply: FastifyReply) => {
    const data: Ping = {
      ping: 'pong'
    }
    return reply.send(data)
  })
}

export default ping
