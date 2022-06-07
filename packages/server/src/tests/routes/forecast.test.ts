import { ForecastResponse } from '@climatic/shared'
import type { FastifyInstance } from 'fastify'
import type { SuperTest, Test, Response } from 'supertest'

import { buildApp } from '@app'
import supertest from 'supertest'

let fastify: FastifyInstance
let api: SuperTest<Test>
let validResponse: Response
let nonValidResponse: Response

const NON_VALID_URL = '/api/forecast?q=nonvalidquery'
const VALID_URL = '/api/forecast?q=madrid'

jest.setTimeout(10000)

beforeAll(async () => {
  fastify = await buildApp({ logger: false })
  api = supertest(fastify.server)

  validResponse = await api.get(VALID_URL)
  nonValidResponse = await api.get(NON_VALID_URL)
}, 10000)

afterAll(() => {
  fastify.close()
})

describe('GET non-valid-query', () => {
  it('has expected statusCode and content-type', async () => {
    await api
      .get(NON_VALID_URL)
      .expect(500)
      .expect('Content-Type', 'application/json; charset=utf-8')
  }, 10000)

  it('has expected properties', async () => {
    const { body } = nonValidResponse

    expect(Object.keys(body).length).toEqual(1)
    expect(body).toHaveProperty('error')
    expect(body.error).toHaveProperty('code')
    expect(body.error).toHaveProperty('message')
    expect(body.error.code).toBe(1006)
  })
})

describe('GET valid-query', () => {
  it('has expected statusCode and content-type', async () => {
    await api
      .get(VALID_URL)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
  }, 10000)

  it('has expected properties', async () => {
    const { body } = validResponse

    expect(Object.keys(body).length).toEqual(3)
    expect(body).toHaveProperty('location')
    expect(body).toHaveProperty('currentWeather')
    expect(body).toHaveProperty('forecast')
  })

  describe('body.location', () => {
    it('has expected properties', async () => {
      const { location: o } = validResponse.body

      expect(Object.keys(o).length).toEqual(5)
      expect(o).toHaveProperty('name')
      expect(o).toHaveProperty('country')
      expect(o).toHaveProperty('timezone')
      expect(o).toHaveProperty('latitude')
      expect(o).toHaveProperty('longitude')
    })

    it('has expected prop. types', async () => {
      const { location: o } = validResponse.body

      expect(typeof o.name).toEqual('string')
      expect(typeof o.country).toEqual('string')
      expect(typeof o.timezone).toEqual('string')
      expect(typeof o.latitude).toEqual('number')
      expect(typeof o.longitude).toEqual('number')
    })
  })

  describe('body.currentWeather', () => {
    it('has expected properties', async () => {
      const body = validResponse.body as ForecastResponse
      const { currentWeather: o } = body

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
      const body = validResponse.body as ForecastResponse
      const { currentWeather: o } = body

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

  describe('body.forecast', () => {
    it('is an array with 3 childs', async () => {
      const body = validResponse.body as ForecastResponse
      const { forecast: data } = body

      expect(Array.isArray(data)).toBeTruthy()
      expect(data.length).toBeGreaterThan(0)
      expect(data.length).toBe(3)
    })

    it('has expected properties', async () => {
      const body = validResponse.body as ForecastResponse
      const { forecast: data } = body

      data.forEach(o => {
        expect(Object.keys(o).length).toEqual(5)
        expect(o).toHaveProperty('timestamp')
        expect(o).toHaveProperty('date')

        expect(o).toHaveProperty('day')
        expect(Object.keys(o.day).length).toEqual(8)
        expect(o.day).toHaveProperty('temperature')
        expect(o.day).toHaveProperty('wind')
        expect(o.day).toHaveProperty('precipitation')
        expect(o.day).toHaveProperty('avgHumidity')
        expect(o.day).toHaveProperty('condition')
        expect(o.day).toHaveProperty('rain')
        expect(o.day).toHaveProperty('snow')
        expect(o.day).toHaveProperty('uv')

        expect(o).toHaveProperty('hours')

        expect(o).toHaveProperty('astro')
        expect(o.astro).toHaveProperty('sunrise')
        expect(o.astro).toHaveProperty('sunset')
        expect(o.astro).toHaveProperty('moonrise')
        expect(o.astro).toHaveProperty('moonset')
        expect(o.astro).toHaveProperty('moon_phase')
        expect(o.astro).toHaveProperty('moon_illumination')
      })
    })

    it('has expected prop. types', async () => {
      const body = validResponse.body as ForecastResponse
      const { forecast: data } = body

      data.forEach(o => {
        expect(typeof o.timestamp).toEqual('number')
        expect(typeof o.date).toEqual('string')

        expect(typeof o.day).toEqual('object')
        expect(typeof o.day.temperature).toEqual('object')
        expect(typeof o.day.temperature.celsius).toEqual('object')
        expect(typeof o.day.temperature.fahrenheit).toEqual('object')
        expect(typeof o.day.wind).toEqual('object')
        expect(typeof o.day.wind.speed).toEqual('object')
        expect(typeof o.day.wind.speed.kph).toEqual('number')
        expect(typeof o.day.wind.speed.mph).toEqual('number')
        expect(typeof o.day.precipitation).toEqual('object')
        expect(typeof o.day.precipitation.mm).toEqual('number')
        expect(typeof o.day.precipitation.inches).toEqual('number')
        expect(typeof o.day.avgHumidity).toEqual('number')
        expect(typeof o.day.condition).toEqual('object')
        expect(typeof o.day.condition.id).toEqual('number')
        expect(typeof o.day.condition.name).toEqual('string')
        expect(typeof o.day.condition.icon).toEqual('string')
        expect(typeof o.day.rain).toEqual('object')
        expect(typeof o.day.snow).toEqual('object')
        expect(typeof o.day.uv).toEqual('number')

        expect(typeof o.hours).toEqual('object')

        expect(typeof o.astro).toEqual('object')
        expect(typeof o.astro.sunrise).toEqual('string')
        expect(typeof o.astro.sunset).toEqual('string')
        expect(typeof o.astro.moonrise).toEqual('string')
        expect(typeof o.astro.moonset).toEqual('string')
        expect(typeof o.astro.moon_phase).toEqual('string')
        expect(typeof o.astro.moon_illumination).toEqual('string')
      })
    })
  })
})
