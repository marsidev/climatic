import 'dotenv/config'
import 'isomorphic-fetch'
import path from 'path'
import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import statics from '@fastify/static'
import { cache } from '@plugins'
import { ping, weather, forecast } from '@routes'
import { logger } from '@lib'

const { PORT = 3001, HOST = '0.0.0.0', APP_URL = '' } = process.env
const server = fastify({ logger: false })

async function setupServer() {
  // register plugins
  await server.register(cache)

  if (APP_URL) {
    await server.register(fastifyCors, { origin: APP_URL })
  }

  // register routes
  await server.register(ping, { prefix: '/api/ping' })
  await server.register(weather, { prefix: '/api/weather' })
  await server.register(forecast, { prefix: '/api/forecast' })

  // serve client build
  const clientBuildPath: string = path.join(__dirname, '../../../dist')
  server.register(statics, { root: clientBuildPath })

  // serve client assets
  const clientAssetsPath: string = path.join(__dirname, '../../../packages/client/src/assets')
  server.register(statics, {
    root: clientAssetsPath, prefix: '/server-assets/',
    decorateReply: false
  })

  // prepare server
  await server.ready()
}

const startServer = async () => {
  try {
    await setupServer()
    await server.listen(PORT, HOST)
    console.log(`Server started on port ${PORT}`)
  } catch (err) {
    logger.error(err)
    process.exit(1)
  }
}

startServer()

export default server
