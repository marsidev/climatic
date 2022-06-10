import type { SearchResponse } from '@climatic/shared'
import type { FastifyInstance } from 'fastify'
import type { SuperTest, Test } from 'supertest'

import { buildApp } from '../../src/app'
import supertest from 'supertest'

let fastify: FastifyInstance
let api: SuperTest<Test>
let validResponse: SearchResponse
let nonValidResponse: SearchResponse

const NON_VALID_URL = '/api/search?q=nonvalidquery'
const VALID_URL = '/api/search?q=madrid'

jest.setTimeout(40000)

beforeAll(async () => {
  fastify = await buildApp({ logger: false })
  api = supertest(fastify.server)

  await api.get(VALID_URL).then(data => {
    validResponse = data.body
  })

  await api.get(NON_VALID_URL).then(data => {
    nonValidResponse = data.body
  })
})

afterAll(async () => {
  await fastify.close()
})

beforeEach(() => {
  jest.setTimeout(40000)
})

describe('GET non-valid-query', () => {
  it('has expected statusCode and content-type', async () => {
    await api
      .get(NON_VALID_URL)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
  }, 10000)

  it('body is an empty array', async () => {
    expect(Array.isArray(nonValidResponse)).toBeTruthy()
    expect(nonValidResponse.length).toBe(0)
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
    expect(Array.isArray(validResponse)).toBeTruthy()
    expect(validResponse.length).toBeGreaterThan(0)
  })

  it('has expected properties', async () => {
    const res = validResponse

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
    const res = validResponse

    expect(typeof res[0].id).toEqual('number')
    expect(typeof res[0].name).toEqual('string')
    expect(typeof res[0].region).toEqual('string')
    expect(typeof res[0].country).toEqual('string')
    expect(typeof res[0].lat).toEqual('number')
    expect(typeof res[0].lon).toEqual('number')
    expect(typeof res[0].url).toEqual('string')
  })
})
