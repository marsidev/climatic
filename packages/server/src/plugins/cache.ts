import type { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify'
import type { Key, Options } from 'node-cache'

import fastifyPlugin from 'fastify-plugin'
import NodeCache from 'node-cache'

const CACHE_TTL: number = 60 // cache duration in seconds
let CACHE_KEY: Key

const CACHE_OPTIONS: Options = {
  stdTTL: CACHE_TTL,
  checkperiod: 600
}
const CacheInstance = new NodeCache(CACHE_OPTIONS)

async function cache(server: FastifyInstance, _options: FastifyPluginOptions): Promise<void> {
  server.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
    if (request.method === 'GET') {
      CACHE_KEY = `${request.method}-${request.url}`
      const cached = CacheInstance.get(CACHE_KEY)

      if (cached !== undefined) {
        console.log('RETURNING FROM CACHE FOR KEY', CACHE_KEY)
        reply.send(cached)
      }
    }
  })

  server.addHook('onSend', (request: FastifyRequest, reply: FastifyReply, payload, done) => {
    if (request.method === 'GET') {
      CACHE_KEY = `${request.method}-${request.url}`
      const response = CacheInstance.get(CACHE_KEY)

      if (response === undefined && reply.statusCode < 400) {
        console.log('CACHING RESPONSE FOR KEY', CACHE_KEY)
        CacheInstance.set(CACHE_KEY, payload, CACHE_TTL)
      }
    }

    done()
  })

  server.after(err => err ? console.log(err) : console.log('Cache plugin is ready.'))
}

export default fastifyPlugin(cache)
