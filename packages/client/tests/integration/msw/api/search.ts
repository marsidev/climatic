import { rest } from 'msw'
import mockSearch from '@climatic/shared/src/mocks/api/formatted/search.json'

export default [
  rest.get('http://localhost:3001/api/search', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockSearch))
  })
]
