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

describe.concurrent('GET /', () => {
	it('has expected statusCode and content-type', async () => {
		await api.get('/').expect(200).expect('Content-Type', 'text/html')
	})

	it('contains a proper <title />', async () => {
		const { text } = await api.get('/')
		expect(text).toContain('<title>Climatic</title>')
	})

	it('contains a #root', async () => {
		const { text } = await api.get('/')
		expect(text).toContain('<div id="root"></div>')
	})
})
