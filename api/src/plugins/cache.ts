import type { FastifyPluginAsync, FastifyRequest } from 'fastify'
import type { Key, Options } from 'node-cache'
import fp from 'fastify-plugin'
import NodeCache from 'node-cache'

const DEBUG = false
const DEFAULT_CACHE_TTL = 900 // cache duration in seconds - 15 minutes
const SEARCH_CACHE_TTL = 86400 // 24h

type CachePluginProps = FastifyPluginAsync<Options>

const cachePlugin: CachePluginProps = async (fastify, _opts) => {
	const cacheInstance = new NodeCache({
		stdTTL: DEFAULT_CACHE_TTL,
		checkperiod: DEFAULT_CACHE_TTL * 2
	})

	fastify.addHook('onRequest', async (request, reply) => {
		const { url, method } = request
		if (method === 'GET') {
			const keys = getCacheKeys(request)

			const cached = cacheInstance.get(keys[0])
			const cachedType = cacheInstance.get(keys[1])
			const isCached = cached !== undefined && cachedType !== undefined

			if (isCached) {
				logger('cached', url, cachedType, keys)
				return reply.type(cachedType as string).send(cached)
			}
		}
	})

	fastify.addHook('onSend', (request, reply, payload, done) => {
		const { url, method } = request
		if (method === 'GET') {
			const contentType = reply.getHeader('content-type')
			const keys = getCacheKeys(request)

			const cached = cacheInstance.get(keys[0])
			const cachedType = cacheInstance.get(keys[1])
			const isCached = cached !== undefined && cachedType !== undefined

			if (url.startsWith('/api/')) {
				if (!isCached && reply.statusCode < 400) {
					logger('caching', url, contentType, keys)

					if (url?.startsWith('/api/search?q=')) {
						cacheInstance.set(keys[0], payload, SEARCH_CACHE_TTL)
						cacheInstance.set(keys[1], contentType, SEARCH_CACHE_TTL)
					} else {
						cacheInstance.set(keys[0], payload, DEFAULT_CACHE_TTL)
						cacheInstance.set(keys[1], contentType, DEFAULT_CACHE_TTL)
					}
				}
			}
		}

		done()
	})
}

const logger = (message: string, url: string, contentType: any, keys: Key[]) => {
	if (DEBUG) {
		console.log({ message, url, contentType, keys })
	}
}

const getCacheKeys = (request: FastifyRequest): Key[] => {
	const { url, method } = request
	const key1 = `${method}__${url}`
	const key2 = `${key1}__content-type`
	return [key1, key2]
}

export default fp(cachePlugin)
