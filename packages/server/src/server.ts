import 'dotenv/config'
import 'isomorphic-fetch'
import fs from 'fs'
import { join } from 'path'
import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyStatic from '@fastify/static'
import autoload from '@fastify/autoload'
import { logger, assetsConfig, clientAssetsConfig, html } from '@lib'

const { PORT = 3001, HOST = '0.0.0.0', APP_URL = '' } = process.env

const server = fastify({ logger: false })

async function setupServer() {
  await server.register(autoload, {
    dir: join(__dirname, 'plugins'),
    ignorePattern: /.*(test|spec).ts/
  })

  if (APP_URL) server.register(fastifyCors, { origin: APP_URL })

  await server.register(autoload, {
    dir: join(__dirname, 'routes'),
    options: { prefix: '/api' },
    ignorePattern: /.*(test|spec).ts/
  })

  // serve static files
  await server.register(fastifyStatic, clientAssetsConfig)
  await server.register(fastifyStatic, assetsConfig)

  server.get('/', async (_request, reply) => {
    await reply.type('text/html').send(fs.createReadStream(html))
  })

  server.get('/*', async (request, reply) => {
    if (request.url.startsWith('/api/')) {
      reply.callNotFound()
    } else {
      reply.redirect('/')
    }
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
