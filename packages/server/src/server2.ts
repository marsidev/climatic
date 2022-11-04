import { performance } from 'perf_hooks'
import { join } from 'node:path'
import Fastify from 'fastify'
import autoload from '@fastify/autoload'
import buildApp from './app'
import config from './lib/config'
import { logger as pino, startupLog } from './lib/logger'

// const runServer = async () => {
// 	const startTime = performance.now()
// 	const { PORT: port, HOST: host } = config

// 	const args = process.argv.slice(2)
// 	const showLogger = args.includes('--log')
// 	const expose = args.includes('--host')
// 	const logger = showLogger ? pino : false

// 	// const app = await buildApp({ logger })
// 	const app = Fastify({ logger })

// 	app.register(autoload, {
// 		dir: join(__dirname, 'plugins')
// 	})

// 	app.register(autoload, {
// 		dir: join(__dirname, 'routes'),
// 		prefix: '/api'
// 	})

// 	app.listen({ port, host }, async (err, address) => {
// 		if (err) return console.error(err)
// 		if (process.env.NODE_ENV !== 'production') startupLog(address, startTime, expose)
// 	})
// }

// runServer()
// export default runServer

const runServer = async () => {
	const startTime = performance.now()
	const { PORT: port, HOST: host } = config

	const args = process.argv.slice(2)
	const showLogger = args.includes('--log')
	const expose = args.includes('--host')
	const logger = showLogger ? pino : false

	// const app = await buildApp({ logger })
	const app = Fastify({ logger })

	await app.register(autoload, {
		dir: join(__dirname, 'plugins')
	})

	await app.register(autoload, {
		dir: join(__dirname, 'routes'),
		prefix: '/api'
	})

	app.listen({ port, host }, (err, address) => {
		if (err) return console.error(err)
		if (process.env.NODE_ENV !== 'production') startupLog(address, startTime, expose)
	})
}

runServer()
