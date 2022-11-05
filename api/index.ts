// eslint-disable-next-line @typescript-eslint/no-var-requires
// const fastifyApp = require('../packages/server/src/server')
// import fastifyApp from '../packages/server/src/server'

// export default fastifyApp
// module.exports = fastifyApp
import Fastify, { FastifyInstance } from 'fastify'

export default async function handler(): Promise<FastifyInstance> {
	const fastify = Fastify()

	fastify.get('/ping', async (_request, reply) => {
		reply.send({ ping: 'pong' })
	})

	const port = Number(process.env.PORT ?? 3001)
	const host = '0.0.0.0'

	await fastify.ready()

	fastify.listen({ port, host }, (err, address) => {
		if (err) return console.error(err)
		console.log(address)
	})

	return fastify
}
