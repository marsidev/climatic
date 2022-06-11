import type { FastifyPluginAsync } from 'fastify'
import type { FastifyStaticOptions } from '@fastify/static'

import fs from 'fs'
import fastifyStatic from '@fastify/static'
import fp from 'fastify-plugin'
import { assetsConfig, clientAssetsConfig, html } from '@lib'

type staticPluginProps = FastifyPluginAsync<FastifyStaticOptions>

const staticPlugin: staticPluginProps = async (fastify, _options) => {
  await fastify.register(fastifyStatic, clientAssetsConfig)

  await fastify.register(fastifyStatic, assetsConfig)

  fastify.get('/', async (_request, reply) => {
    return reply.type('text/html').send(fs.createReadStream(html))
  })
}

export default fp(staticPlugin)
