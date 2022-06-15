import { rest } from 'msw'
import mockSearch from './search.json'

export default [
  rest.get('http://localhost:3001/api/search', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockSearch))
  })
]
