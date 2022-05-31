import type { FastifyPluginAsync } from 'fastify'
import type { Key, Options } from 'node-cache'

import fp from 'fastify-plugin'
import NodeCache from 'node-cache'

const CACHE_TTL: number = 900 // cache duration in seconds - 15 minutes
let CACHE_KEY: Key

const CACHE_OPTIONS: Options = {
  stdTTL: CACHE_TTL,
  checkperiod: CACHE_TTL * 2
}
const CacheInstance = new NodeCache(CACHE_OPTIONS)

const pluginCallback: FastifyPluginAsync = async (server, _options) => {
  server.addHook('onRequest', async (request, reply) => {
    if (request.method === 'GET') {
      const { url, method } = request
      CACHE_KEY = `${method}-${url}`
      const cached = CacheInstance.get(CACHE_KEY)

      if (cached !== undefined) {
        // console.log('RETURNING FROM CACHE FOR KEY', CACHE_KEY)
        reply.send(cached)
      }
    }
  })

  server.addHook('onSend', (request, reply, payload, done) => {
    if (request.method === 'GET') {
      const { url, method } = request
      CACHE_KEY = `${method}-${url}`
      const response = CacheInstance.get(CACHE_KEY)

      if (url?.includes('/api/')) {
        if (response === undefined && reply.statusCode < 400) {
          // console.log('CACHING RESPONSE FOR KEY', CACHE_KEY)
          CacheInstance.set(CACHE_KEY, payload, CACHE_TTL)
        }
      }
    }

    done()
  })
}

export const cache = fp(pluginCallback)
