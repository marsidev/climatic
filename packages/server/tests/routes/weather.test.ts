import type { WeatherResponse } from '~/../../packages/shared'
import type { SuperTest, Test } from 'supertest'
import type { FastifyInstance } from 'fastify'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import supertest from 'supertest'
import { buildApp } from '../../src/app'

const NON_VALID_URL = '/api/weather?q=nonvalidquery'
const VALID_URL = '/api/weather?q=madrid'

let api: SuperTest<Test>
let fastify: FastifyInstance

beforeAll(async () => {
	fastify = await buildApp({ logger: false })
	api = supertest(fastify.server)
})

afterAll(async () => {
	await fastify.close()
})

describe.concurrent('GET /api/weather', () => {
	describe.concurrent('with a non-valid-query', () => {
		it('has expected statusCode and content-type', async () => {
			await api.get(NON_VALID_URL).expect(500).expect('Content-Type', 'application/json; charset=utf-8')
		})

		it('has expected properties', async () => {
			const { body: res } = await api.get(NON_VALID_URL)

			expect(Object.keys(res).length).toEqual(1)
			expect(res).toHaveProperty('error')
			expect(res.error).toHaveProperty('code')
			expect(res.error).toHaveProperty('message')
			expect(res.error?.code).toBe(1006)
		})
	})

	describe.concurrent('with a valid-query', () => {
		it('has expected statusCode and content-type', async () => {
			await api.get(VALID_URL).expect(200).expect('Content-Type', 'application/json; charset=utf-8')
		})

		it('has expected properties', async () => {
			const { body: res } = await api.get(VALID_URL)
			expect(Object.keys(res).length).toEqual(2)
			expect(res).toHaveProperty('location')
			expect(res).toHaveProperty('weather')
		})

		describe.concurrent('body.location', () => {
			it('has expected properties', async () => {
				const { body: res } = await api.get(VALID_URL)
				const { location: o } = res as WeatherResponse

				expect(Object.keys(o).length).toEqual(5)
				expect(o).toHaveProperty('name')
				expect(o).toHaveProperty('country')
				expect(o).toHaveProperty('timezone')
				expect(o).toHaveProperty('latitude')
				expect(o).toHaveProperty('longitude')
			})

			it('has expected prop. types', async () => {
				const { body: res } = await api.get(VALID_URL)
				const { location: o } = res as WeatherResponse

				expect(typeof o.name).toEqual('string')
				expect(typeof o.country).toEqual('string')
				expect(typeof o.timezone).toEqual('string')
				expect(typeof o.latitude).toEqual('number')
				expect(typeof o.longitude).toEqual('number')
			})
		})

		describe.concurrent('body.weather', () => {
			it('has expected properties', async () => {
				const { body } = await api.get(VALID_URL)
				const { weather: o } = body as WeatherResponse

				expect(Object.keys(o).length).toEqual(11)
				expect(o).toHaveProperty('cloud')
				expect(o).toHaveProperty('humidity')
				expect(o).toHaveProperty('isDay')

				expect(o).toHaveProperty('temperature')
				expect(o.temperature).toHaveProperty('celsius')
				expect(o.temperature).toHaveProperty('fahrenheit')

				expect(o).toHaveProperty('feelsLike')
				expect(o.feelsLike).toHaveProperty('celsius')
				expect(o.feelsLike).toHaveProperty('fahrenheit')

				expect(o).toHaveProperty('wind')
				expect(o.wind).toHaveProperty('speed')
				expect(o.wind.speed).toHaveProperty('kph')
				expect(o.wind.speed).toHaveProperty('mph')
				expect(o.wind).toHaveProperty('direction')
				expect(o.wind).toHaveProperty('degree')

				expect(o).toHaveProperty('pressure')
				expect(o.pressure).toHaveProperty('mb')
				expect(o.pressure).toHaveProperty('in')
				/* ... */
				expect(o).toHaveProperty('condition')
				expect(o.condition).toHaveProperty('id')
				expect(o.condition).toHaveProperty('name')
				expect(o.condition).toHaveProperty('icon')

				expect(o).toHaveProperty('updateAt')
				expect(o).toHaveProperty('updateDateAt')
				expect(o).not.toHaveProperty('nonExistingProp')
			})

			it('has expected prop. types', async () => {
				const { body } = await api.get(VALID_URL)
				const { weather: o } = body as WeatherResponse

				expect(typeof o.cloud).toEqual('number')
				expect(typeof o.humidity).toEqual('number')
				expect(typeof o.isDay).toEqual('boolean')

				expect(typeof o.temperature).toEqual('object')
				expect(typeof o.temperature.celsius).toEqual('number')
				expect(typeof o.temperature.fahrenheit).toEqual('number')

				expect(typeof o.feelsLike).toEqual('object')
				expect(typeof o.feelsLike.celsius).toEqual('number')
				expect(typeof o.feelsLike.fahrenheit).toEqual('number')

				expect(typeof o.wind).toEqual('object')
				expect(typeof o.wind.speed).toEqual('object')
				expect(typeof o.wind.speed.kph).toEqual('number')
				expect(typeof o.wind.speed.mph).toEqual('number')
				expect(typeof o.wind.direction).toEqual('string')
				expect(typeof o.wind.degree).toEqual('number')

				expect(typeof o.pressure).toEqual('object')
				expect(typeof o.pressure.mb).toEqual('number')
				expect(typeof o.pressure.in).toEqual('number')

				expect(typeof o.condition).toEqual('object')
				expect(typeof o.condition.id).toEqual('number')
				expect(typeof o.condition.name).toEqual('string')
				expect(typeof o.condition.icon).toEqual('string')

				expect(typeof o.updateAt).toEqual('number')
				expect(typeof o.updateDateAt).toEqual('string')
			})
		})
	})
})
