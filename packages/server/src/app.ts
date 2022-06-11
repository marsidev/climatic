import type { FastifyInstance, FastifyServerOptions } from 'fastify'

import 'isomorphic-fetch'
import { join } from 'path'
import fastify from 'fastify'
import autoload from '@fastify/autoload'

const buildApp = async (opts: FastifyServerOptions = {}): Promise<FastifyInstance> => {
  const app = fastify(opts)

  await app.register(autoload, {
    dir: join(__dirname, 'plugins')
  })

  await app.register(autoload, {
    dir: join(__dirname, 'routes'),
    options: { prefix: '/api' }
  })

  await app.ready()

  return app
}

export default buildApp
export { buildApp }
