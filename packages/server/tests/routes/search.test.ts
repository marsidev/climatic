import type { SearchResponse } from '@climatic/shared'
import type { SuperTest, Test } from 'supertest'
import type { FastifyInstance } from 'fastify'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import supertest from 'supertest'
import { buildApp } from '../../src/app'

const NON_VALID_URL = '/api/search?q=nonvalidquery'
const VALID_URL = '/api/search?q=madrid'

let api: SuperTest<Test>
let fastify: FastifyInstance

beforeAll(async () => {
	fastify = await buildApp({ logger: false })
	api = supertest(fastify.server)
})

afterAll(async () => {
	await fastify.close()
})

describe.concurrent('GET /api/search', () => {
	describe.concurrent('with a non-valid query', () => {
		it('has expected statusCode and content-type', async () => {
			await api
				.get(NON_VALID_URL)
				.expect(200)
				.expect('Content-Type', 'application/json; charset=utf-8')
		})

		it('body is an empty array', async () => {
			const { body } = await api.get(NON_VALID_URL)
			expect(Array.isArray(body)).toBeTruthy()
			expect(body.length).toBe(0)
		})
	})

	describe.concurrent('with a valid query', () => {
		it('has expected statusCode and content-type', async () => {
			await api
				.get(VALID_URL)
				.expect(200)
				.expect('Content-Type', 'application/json; charset=utf-8')
		})

		it('is an array with length greater than 0', async () => {
			const { body } = await api.get(VALID_URL)
			expect(Array.isArray(body)).toBeTruthy()
			expect(body.length).toBeGreaterThan(0)
		})

		it('has expected properties', async () => {
			const { body } = await api.get(VALID_URL)
			const res = body as SearchResponse

			expect(Object.keys(res[0]).length).toEqual(7)
			expect(res[0]).toHaveProperty('id')
			expect(res[0]).toHaveProperty('name')
			expect(res[0]).toHaveProperty('region')
			expect(res[0]).toHaveProperty('country')
			expect(res[0]).toHaveProperty('lat')
			expect(res[0]).toHaveProperty('lon')
			expect(res[0]).toHaveProperty('url')
			expect(res[0]).not.toHaveProperty('nonExistingProp')
		})

		it('first children properties. has expected types', async () => {
			const { body } = await api.get(VALID_URL)
			const res = body as SearchResponse

			expect(typeof res[0].id).toEqual('number')
			expect(typeof res[0].name).toEqual('string')
			expect(typeof res[0].region).toEqual('string')
			expect(typeof res[0].country).toEqual('string')
			expect(typeof res[0].lat).toEqual('number')
			expect(typeof res[0].lon).toEqual('number')
			expect(typeof res[0].url).toEqual('string')
		})
	})
})
