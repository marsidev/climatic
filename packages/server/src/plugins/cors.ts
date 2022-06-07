import type { FastifyPluginAsync } from 'fastify'
import config from '@lib/config'

import fastifyCors from '@fastify/cors'
import fp from 'fastify-plugin'
const { APP_URL: origin } = config

const pluginCallback: FastifyPluginAsync = async (fastify, _options) => {
  fastify.register(fastifyCors, {
    origin
  })
}

export default fp(pluginCallback)
