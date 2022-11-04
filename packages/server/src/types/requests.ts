import type { FastifyRequest } from 'fastify'

export interface Ping { ping: string }

export interface FetchOptions {
	method: string
	headers: {
		[key: string]: string
	}
}

interface WeatherQuerystring {
	q: string
	original?: string
	lang?: string
}

export interface ForecastQuerystring extends WeatherQuerystring {
	days?: number
	dt?: string
}

interface WeatherRequestQuery {
	Querystring: WeatherQuerystring
}

interface ForecastRequestQuery {
	Querystring: ForecastQuerystring
}

interface ConditionsI18nQuerystring {
	Params: { lang: string }
}

export type WeatherRequest = FastifyRequest<WeatherRequestQuery>
export type SearchRequest = FastifyRequest<WeatherRequestQuery>
export type ForecastRequest = FastifyRequest<ForecastRequestQuery>
export type ConditionsI18nRequest = FastifyRequest<ConditionsI18nQuerystring>
