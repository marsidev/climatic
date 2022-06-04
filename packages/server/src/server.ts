import 'dotenv/config'
import 'isomorphic-fetch'
import fs from 'fs'
import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import { cache } from '@plugins'
import { ping, weather, forecast, search } from '@routes'
import { logger, assetsConfig, clientAssetsConfig, html } from '@lib'

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
  await server.register(search, { prefix: '/api/search' })

  // serve static files
  await server.register(fastifyStatic, assetsConfig)
  await server.register(fastifyStatic, clientAssetsConfig)
  server.get('/*', async (_request, reply) => {
    await reply.type('text/html').send(fs.createReadStream(html))
  })

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
