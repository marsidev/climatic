import type { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'

const redirectPlugin: FastifyPluginAsync = async (fastify, _opts) => {
	fastify.get('/*', async (request, reply) => {
		if (request.url.startsWith('/api/')) {
			return reply.callNotFound()
		}

		return reply.redirect('/')
	})
}

export default fp(redirectPlugin)
