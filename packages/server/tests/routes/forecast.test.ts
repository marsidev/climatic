import type { ForecastResponse } from '@climatic/shared'
import type { FastifyInstance } from 'fastify'
import type { SuperTest, Test } from 'supertest'

import { buildApp } from '../../src/app'
import supertest from 'supertest'

let fastify: FastifyInstance
let api: SuperTest<Test>
let validResponse: ForecastResponse
let nonValidResponse: ForecastResponse

const forecastDays = 4
const NON_VALID_URL = '/api/forecast?q=nonvalidquery'
const VALID_URL = `/api/forecast?q=madrid&days=${forecastDays}`

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
      .expect(500)
      .expect('Content-Type', 'application/json; charset=utf-8')
  }, 10000)

  it('has expected properties', async () => {
    const res = nonValidResponse

    expect(Object.keys(res).length).toEqual(1)
    expect(res).toHaveProperty('error')
    expect(res.error).toHaveProperty('code')
    expect(res.error).toHaveProperty('message')
    expect(res.error?.code).toBe(1006)
  })
})

describe(`GET valid-query (${VALID_URL})`, () => {
  it('has expected statusCode and content-type', async () => {
    await api
      .get(VALID_URL)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
  }, 10000)

  it('has expected properties', async () => {
    const res = validResponse

    expect(Object.keys(res).length).toEqual(3)
    expect(res).toHaveProperty('location')
    expect(res).toHaveProperty('currentWeather')
    expect(res).toHaveProperty('forecast')
  })

  describe('body.location', () => {
    it('has expected properties', async () => {
      const { location: o } = validResponse

      expect(Object.keys(o).length).toEqual(5)
      expect(o).toHaveProperty('name')
      expect(o).toHaveProperty('country')
      expect(o).toHaveProperty('timezone')
      expect(o).toHaveProperty('latitude')
      expect(o).toHaveProperty('longitude')
    })

    it('has expected prop. types', async () => {
      const { location: o } = validResponse

      expect(typeof o.name).toEqual('string')
      expect(typeof o.country).toEqual('string')
      expect(typeof o.timezone).toEqual('string')
      expect(typeof o.latitude).toEqual('number')
      expect(typeof o.longitude).toEqual('number')
    })
  })

  describe('body.currentWeather', () => {
    it('has expected properties', async () => {
      const body = validResponse
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
      const body = validResponse
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
    it(`is an array with ${forecastDays} childs`, async () => {
      const body = validResponse
      const { forecast: data } = body

      expect(Array.isArray(data)).toBeTruthy()
      expect(data.length).toBeGreaterThan(0)
      expect(data.length).toBe(forecastDays)
    })

    describe('body.forecast[0]', () => {
      it('has expected properties', async () => {
        const body = validResponse
        const { forecast: data } = body
        const o = data[0]

        expect(Object.keys(o).length).toEqual(5)
        expect(o).toHaveProperty('timestamp')
        expect(o).toHaveProperty('date')
        expect(o).toHaveProperty('day')
        expect(o).toHaveProperty('hours')
        expect(o).toHaveProperty('astro')
      })

      it('has expected prop. types', async () => {
        const body = validResponse
        const { forecast: data } = body
        const o = data[0]

        expect(typeof o.timestamp).toEqual('number')
        expect(typeof o.date).toEqual('string')
        expect(typeof o.day).toEqual('object')
        expect(typeof o.hours).toEqual('object')
        expect(typeof o.astro).toEqual('object')
      })

      describe('body.forecast[0].day', () => {
        it('has expected properties', async () => {
          const body = validResponse
          const { forecast: data } = body
          const o = data[0].day

          expect(Object.keys(o).length).toEqual(8)
          expect(o).toHaveProperty('temperature')
          expect(o).toHaveProperty('wind')
          expect(o).toHaveProperty('precipitation')
          expect(o).toHaveProperty('avgHumidity')
          expect(o).toHaveProperty('condition')
          expect(o).toHaveProperty('rain')
          expect(o).toHaveProperty('snow')
          expect(o).toHaveProperty('uv')
        })

        it('has expected prop. types', async () => {
          const body = validResponse
          const { forecast: data } = body
          const o = data[0].day

          expect(typeof o.temperature).toEqual('object')
          expect(typeof o.temperature.celsius).toEqual('object')
          expect(typeof o.temperature.fahrenheit).toEqual('object')
          expect(typeof o.wind).toEqual('object')
          expect(typeof o.wind.speed).toEqual('object')
          expect(typeof o.wind.speed.kph).toEqual('number')
          expect(typeof o.wind.speed.mph).toEqual('number')
          expect(typeof o.precipitation).toEqual('object')
          expect(typeof o.precipitation.mm).toEqual('number')
          expect(typeof o.precipitation.inches).toEqual('number')
          expect(typeof o.avgHumidity).toEqual('number')
          expect(typeof o.condition).toEqual('object')
          expect(typeof o.condition.id).toEqual('number')
          expect(typeof o.condition.name).toEqual('string')
          expect(typeof o.condition.icon).toEqual('string')
          expect(typeof o.rain).toEqual('object')
          expect(typeof o.snow).toEqual('object')
          expect(typeof o.uv).toEqual('number')
        })
      })

      describe('body.forecast[0].astro', () => {
        it('has expected properties', async () => {
          const body = validResponse
          const { forecast: data } = body
          const o = data[0].astro

          expect(o).toHaveProperty('sunrise')
          expect(o).toHaveProperty('sunset')
          expect(o).toHaveProperty('moonrise')
          expect(o).toHaveProperty('moonset')
          expect(o).toHaveProperty('moon_phase')
          expect(o).toHaveProperty('moon_illumination')
        })

        it('has expected prop. types', async () => {
          const body = validResponse
          const { forecast: data } = body
          const o = data[0].astro

          expect(typeof o.sunrise).toEqual('string')
          expect(typeof o.sunset).toEqual('string')
          expect(typeof o.moonrise).toEqual('string')
          expect(typeof o.moonset).toEqual('string')
          expect(typeof o.moon_phase).toEqual('string')
          expect(typeof o.moon_illumination).toEqual('string')
        })
      })

      describe('body.forecast[0].hours', () => {
        it('is an array with a length of 24', async () => {
          const body = validResponse
          const { forecast: data } = body
          const o = data[0].hours

          expect(Array.isArray(o)).toBeTruthy()
          expect(o.length).toBe(24)
        })

        it('has expected properties', async () => {
          const body = validResponse
          const { forecast: data } = body
          const { hours } = data[0]

          hours.forEach(o => {
            expect(Object.keys(o).length).toEqual(14)
            expect(o).toHaveProperty('hour')
            expect(o).toHaveProperty('condition')
            expect(o).toHaveProperty('cloud')
            expect(o).toHaveProperty('humidity')
            expect(o).toHaveProperty('isDay')
            expect(o).toHaveProperty('temperature')
            expect(o).toHaveProperty('feelsLike')
            expect(o).toHaveProperty('wind')
            expect(o).toHaveProperty('pressure')
            expect(o).toHaveProperty('rain')
            expect(o).toHaveProperty('snow')
            expect(o).toHaveProperty('uv')
            expect(o).toHaveProperty('timestamp')
            expect(o).toHaveProperty('date')
          })
        })

        it('has expected prop. types', async () => {
          const body = validResponse
          const { forecast: data } = body
          const { hours } = data[0]

          hours.forEach(o => {
            expect(Object.keys(o).length).toEqual(14)
            expect(typeof o.hour).toEqual('number')
            expect(typeof o.condition).toEqual('object')
            expect(typeof o.cloud).toEqual('number')
            expect(typeof o.humidity).toEqual('number')
            expect(typeof o.isDay).toEqual('boolean')
            expect(typeof o.temperature).toEqual('object')
            expect(typeof o.feelsLike).toEqual('object')
            expect(typeof o.wind).toEqual('object')
            expect(typeof o.pressure).toEqual('object')
            expect(typeof o.rain).toEqual('object')
            expect(typeof o.snow).toEqual('object')
            expect(typeof o.uv).toEqual('number')
            expect(typeof o.timestamp).toEqual('number')
            expect(typeof o.date).toEqual('string')
          })
        })
      })
    })
  })
})
