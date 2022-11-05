/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const fastifyApp = require('../packages/server/src/server')
// import fastifyApp from '../packages/server/src/server'

// export default fastifyApp
// module.exports = fastifyApp
import Fastify, { FastifyInstance } from 'fastify'

async function handler(): Promise<FastifyInstance> {
	const fastify = Fastify()

	fastify.get('/api/ping', async (_request, reply) => {
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

export default handler()

// const app = require('express')()
// const { v4 } = require('uuid')

// app.get('/api', (req, res) => {
// 	const path = `/api/item/${v4()}`
// 	res.setHeader('Content-Type', 'text/html')
// 	res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
// 	res.end(`Hello! Go to item: <a href="${path}">${path}</a>`)
// })

// app.get('/api/item/:slug', (req, res) => {
// 	const { slug } = req.params
// 	res.end(`Item: ${slug}`)
// })

// module.exports = app
