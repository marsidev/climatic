import type { ConditionsI18nRequest } from '@types'
import type { FastifyPluginAsync } from 'fastify'
import { generatei18nDictionary, getSupportedLocales } from '../lib/conditions'

const localesSupported = getSupportedLocales()

export const conditionsI18n: FastifyPluginAsync = async (server, opts) => {
	server.get('/conditions-i18n/langs', opts, async (_request, reply) => {
		return reply.send(localesSupported)
	})

	server.get('/conditions-i18n/:lang', opts, async (request: ConditionsI18nRequest, reply) => {
		const { lang } = request.params

		if (!localesSupported.includes(lang)) {
			return reply.status(400).send({
				error: `lang '${lang}' is not supported`
			})
		}

		const data = generatei18nDictionary(lang)
		return reply.send(data)
	})
}

export default conditionsI18n
