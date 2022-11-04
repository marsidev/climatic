import type { FastifyInstance, FastifyServerOptions } from 'fastify'
import 'isomorphic-fetch'
import { join } from 'node:path'
import fastify from 'fastify'
// import autoload from './lib/autoload'
import autoload from '@fastify/autoload'

const buildApp = async (opts: FastifyServerOptions = {}): Promise<FastifyInstance> => {
	const app = fastify(opts)

	// await autoload(app, {
	// 	dir: 'src/plugins'
	// })

	// await autoload(app, {
	// 	dir: 'src/routes',
	// 	options: { prefix: '/api' }
	// })

	app.register(autoload, {
		dir: join(__dirname, 'plugins')
	})

	app.register(autoload, {
		dir: join(__dirname, 'routes'),
		prefix: '/api'
	})

	await app.ready()

	return app
}

export default buildApp
export { buildApp }
