import type { SuperTest, Test } from 'supertest'
import type { FastifyInstance } from 'fastify'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import supertest from 'supertest'
import { buildApp } from '../../src/app'

let api: SuperTest<Test>
let fastify: FastifyInstance

beforeAll(async () => {
	fastify = await buildApp({ logger: false })
	api = supertest(fastify.server)
})

afterAll(async () => {
	await fastify.close()
})

describe.concurrent('GET /api/ping', () => {
	it('has expected statusCode and content-type', async () => {
		await api
			.get('/api/ping')
			.expect(200)
			.expect('Content-Type', 'application/json; charset=utf-8')
	})

	it('has a expected content', async () => {
		const { body } = await api.get('/api/ping')

		expect(body).toHaveProperty('ping')
		expect(body.ping).toBeTruthy()
		expect(body.ping).toEqual('pong')
	})
})
