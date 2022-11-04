import { rest } from 'msw'
import mockSearch from '@climatic/shared/mocks/api/formatted/search.json'

export default [
	rest.get('http://localhost:3001/api/search', (_req, res, ctx) => {
		return res(ctx.status(200), ctx.json(mockSearch))
	})
]
