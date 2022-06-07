import type { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'

const pluginCallback: FastifyPluginAsync = async (fastify, _options) => {
  fastify.get('/*', async (request, reply) => {
    if (request.url.startsWith('/api/')) {
      reply.callNotFound()
    } else {
      reply.redirect('/')
    }
  })
}

export default fp(pluginCallback)
