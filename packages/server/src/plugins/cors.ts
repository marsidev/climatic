import type { FastifyPluginAsync } from 'fastify'
import type { FastifyCorsOptions } from '@fastify/cors'

import cors from '@fastify/cors'
import fp from 'fastify-plugin'
import config from '@lib/config'

const { APP_URL: origin } = config

type CorsPluginProps = FastifyPluginAsync<FastifyCorsOptions>

const corsPlugin: CorsPluginProps = async (fastify, _options) => {
  await fastify.register(cors, {
    origin
  })
}

export default fp(corsPlugin)
