import type { FastifyInstance } from 'fastify'
import type { SuperTest, Test, Response } from 'supertest'

import { buildApp } from '@app'
import supertest from 'supertest'

let fastify: FastifyInstance
let api: SuperTest<Test>
let validResponse: Response
let nonValidResponse: Response

const NON_VALID_URL = '/api/search?q=nonvalidquery'
const VALID_URL = '/api/search?q=madrid'

jest.setTimeout(10000)

beforeAll(async () => {
  fastify = await buildApp({ logger: false })
  api = supertest(fastify.server)

  validResponse = await api.get(VALID_URL)
  nonValidResponse = await api.get(NON_VALID_URL)
})

afterAll(() => {
  fastify.close()
})

describe('GET non-valid-query', () => {
  it('has expected statusCode and content-type', async () => {
    await api
      .get(NON_VALID_URL)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
  }, 10000)

  it('body is an empty array', async () => {
    const { body } = nonValidResponse

    expect(Array.isArray(body)).toBeTruthy()
    expect(body.length).toBe(0)
  })
})

describe('GET valid-query', () => {
  it('has expected statusCode and content-type', async () => {
    await api
      .get(VALID_URL)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
  }, 10000)

  it('is an array with length greater than 0', async () => {
    const { body } = validResponse

    expect(Array.isArray(body)).toBeTruthy()
    expect(body.length).toBeGreaterThan(0)
  })

  it('has expected properties', async () => {
    const { body } = validResponse

    expect(Object.keys(body[0]).length).toEqual(7)
    expect(body[0]).toHaveProperty('id')
    expect(body[0]).toHaveProperty('name')
    expect(body[0]).toHaveProperty('region')
    expect(body[0]).toHaveProperty('country')
    expect(body[0]).toHaveProperty('lat')
    expect(body[0]).toHaveProperty('lon')
    expect(body[0]).toHaveProperty('url')
    expect(body[0]).not.toHaveProperty('nonExistingProp')
  })

  it('first children properties. has expected types', async () => {
    const { body } = validResponse

    expect(typeof body[0].id).toEqual('number')
    expect(typeof body[0].name).toEqual('string')
    expect(typeof body[0].region).toEqual('string')
    expect(typeof body[0].country).toEqual('string')
    expect(typeof body[0].lat).toEqual('number')
    expect(typeof body[0].lon).toEqual('number')
    expect(typeof body[0].url).toEqual('string')
  })
})
