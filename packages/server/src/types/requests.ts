import { FastifyRequest } from 'fastify'

export interface Ping { ping: string }

export interface FetchOptions {
  method: string
  headers: {
    [key: string]: string
  }
}

interface WeatherQuerystring {
  Querystring: { q: string, original: string }
}

export type WeatherRequest = FastifyRequest<WeatherQuerystring>
export type ForecastRequest = FastifyRequest<WeatherQuerystring>
