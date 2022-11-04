import { performance } from 'perf_hooks'
import 'isomorphic-fetch'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import sensible from '@fastify/sensible'
import cache from './plugins/cache'
import staticPlugin from './plugins/static'
import redirect from './plugins/redirect'
import conditionsRoute from './routes/conditions-i18n'
import forecastRoute from './routes/forecast'
import pingRoute from './routes/ping'
import searchRoute from './routes/search'
import weatherRoute from './routes/weather'
import { logger as pino, startupLog } from './lib/logger'
import config from './lib/config'
// import buildApp from './app'

const startTime = performance.now()
const { PORT: port, HOST: host, APP_URL: origin } = config

const args = process.argv.slice(2)
const showLogger = args.includes('--log')
const expose = args.includes('--host')
const logger = showLogger ? pino : false

// const app = await buildApp({ logger })
const app = Fastify({ logger })

/** plugins */
app.register(cors, { origin })
app.register(cache)
app.register(sensible)
app.register(redirect)
app.register(staticPlugin)

/** routes */
app.register(pingRoute)
app.register(conditionsRoute)
app.register(forecastRoute)
app.register(weatherRoute)
app.register(searchRoute)

app.listen({ port, host }, (err, address) => {
	if (err) return console.error(err)
	if (process.env.NODE_ENV !== 'production') startupLog(address, startTime, expose)
})

export default app
