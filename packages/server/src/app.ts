import type { FastifyInstance, FastifyServerOptions } from 'fastify'

import 'isomorphic-fetch'
import fastify from 'fastify'
import autoload from '@lib/autoload'

const buildApp = async (opts: FastifyServerOptions = {}): Promise<FastifyInstance> => {
  const app = fastify(opts)

  await autoload(app, {
    dir: 'src/plugins'
  })

  await autoload(app, {
    dir: 'src/routes',
    options: { prefix: '/api' }
  })

  await app.ready()

  return app
}

export default buildApp
export { buildApp }
