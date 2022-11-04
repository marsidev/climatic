import { performance } from 'perf_hooks'
import buildApp from './app'
import config from './lib/config'
import { logger as pino, startupLog } from './lib/logger'

const runServer = async () => {
	const startTime = performance.now()
	const { PORT: port, HOST: host } = config

	const args = process.argv.slice(2)
	const showLogger = args.includes('--log')
	const expose = args.includes('--host')
	const logger = showLogger ? pino : false

	const app = await buildApp({ logger })

	app.listen({ port, host }, async (err, address) => {
		if (err) return console.error(err)
		startupLog(address, startTime, expose)
	})
}

runServer()
