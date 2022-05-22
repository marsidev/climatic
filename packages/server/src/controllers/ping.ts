import { Ping } from '../types'
import { FastifyInstance, FastifyPluginOptions, FastifyPluginCallback, FastifyReply, FastifyRequest } from 'fastify'

export const ping: FastifyPluginCallback = async (server: FastifyInstance, opts: FastifyPluginOptions) => {
  server.get('/', opts, async (_request: FastifyRequest, reply: FastifyReply) => {
    const data: Ping = {
      ping: 'pong'
    }
    return reply.send(data)
  })
}

export default ping
