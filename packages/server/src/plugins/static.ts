import type { FastifyPluginAsync } from 'fastify'

import fs from 'fs'
import fastifyStatic from '@fastify/static'
import fp from 'fastify-plugin'
import { assetsConfig, clientAssetsConfig, html } from '@lib'

const pluginCallback: FastifyPluginAsync = async (fastify, _options) => {
  fastify.register(fastifyStatic, clientAssetsConfig)

  fastify.register(fastifyStatic, assetsConfig)

  fastify.get('/', async (_request, reply) => {
    await reply.type('text/html').send(fs.createReadStream(html))
  })
}

export default fp(pluginCallback)
