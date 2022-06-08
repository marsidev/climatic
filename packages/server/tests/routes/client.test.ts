import type { FastifyInstance } from 'fastify'
import type { SuperTest, Test } from 'supertest'

import { buildApp } from '../../src/app'
import supertest from 'supertest'

let fastify: FastifyInstance
let api: SuperTest<Test>
let validResponse: string

const VALID_URL = '/'

jest.setTimeout(40000)

beforeAll(async () => {
  fastify = await buildApp({ logger: false })
  api = supertest(fastify.server)

  await api.get(VALID_URL).then(data => {
    validResponse = data.text
  })
})

afterAll(() => {
  fastify.close()
})

describe('GET /', () => {
  it('has expected statusCode and content-type', async () => {
    await api.get(VALID_URL).expect(200).expect('Content-Type', 'text/html')
  }, 10000)

  it('contains a proper <title />', async () => {
    expect(validResponse).toContain('<title>Climatic</title>')
  })

  it('contains a #root', async () => {
    expect(validResponse).toContain('<div id="root"></div>')
  })
})
