import { rest } from 'msw'
import mockForecast from '@climatic/shared/mocks/api/formatted/forecast.json'
import mockForecastLa from '@climatic/shared/mocks/api/formatted/forecast-la.json'

export default [
	rest.get('http://localhost:3001/api/forecast', (req, res, ctx) => {
		const query = req.url.searchParams.get('q')

		if (query?.includes('angeles')) return res(ctx.status(200), ctx.json(mockForecastLa))

		return res(ctx.status(200), ctx.json(mockForecast))
	})
]
