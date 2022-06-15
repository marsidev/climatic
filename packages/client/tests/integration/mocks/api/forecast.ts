import { rest } from 'msw'
import mockForecast from './forecast.json'
import mockForecastMadrid from './forecast.json'

export default [
  rest.get('http://localhost:3001/api/forecast', (req, res, ctx) => {
    const query = req.url.searchParams.get('q')

    if (query?.includes('madrid')) return res(ctx.status(200), ctx.json(mockForecastMadrid))

    return res(ctx.status(200), ctx.json(mockForecast))
  })
]
