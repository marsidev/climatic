import type { ForecastRequest } from '@types'
import type { FastifyPluginAsync } from 'fastify'
import { fetchForecastData, formatForecastData, formatQuery } from '../lib'

const mocksPath = '~/../../packages/shared/src/mocks/api/source/'

export const forecast: FastifyPluginAsync = async (server, opts) => {
	server.get('/forecast', opts, async (request: ForecastRequest, reply) => {
		const { query } = request
		const { q = 'Los Angeles', original = '0', days = 3 } = query

		let forecastData: any
		if (q === '{{mock}}') {
			forecastData = require(`${mocksPath}/forecast.json`)
		} else if (q === '{{mock-la}}') {
			forecastData = require(`${mocksPath}/forecast-la.json`)
		} else {
			forecastData = await fetchForecastData({ q: formatQuery(q), days })
		}

		if (forecastData.error) {
			return reply.code(500).send(forecastData)
		}

		if (original === '1') {
			return reply.send(forecastData)
		}

		const data = formatForecastData(forecastData)
		return reply.send(data)
	})
}

export default forecast
