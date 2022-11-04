import type { Ping } from '../types'
import type { FastifyPluginAsync } from 'fastify'

export const ping: FastifyPluginAsync = async (server, opts) => {
	server.get('/ping', opts, async (_request, reply) => {
		const data: Ping = {
			ping: 'pong'
		}
		return reply.send(data)
	})
}

export default ping
