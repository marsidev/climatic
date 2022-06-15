import type { FastifyInstance } from 'fastify'
import type { SuperTest, Test } from 'supertest'

import { buildApp } from '../../src/app'
import supertest from 'supertest'

let fastify: FastifyInstance
let api: SuperTest<Test>

const URL = '/api/ping'

beforeAll(async () => {
  fastify = await buildApp({ logger: false })
  api = supertest(fastify.server)
})

afterAll(async () => {
  await fastify.close()
})

beforeEach(() => {
  jest.setTimeout(40000)
})

describe('GET /api/ping', () => {
  it('has expected statusCode and content-type', async () => {
    await api
      .get(URL)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
  }, 10000)

  it('has a expected content', async () => {
    const { body } = await api.get(URL)

    expect(body).toHaveProperty('ping')
    expect(body.ping).not.toBeNull()
    expect(body.ping).toEqual('pong')
  })
})
