import type { Server, IncomingMessage, ServerResponse } from 'http'

import 'dotenv/config'
import 'isomorphic-fetch'
import fastify, { FastifyInstance } from 'fastify'
import routing from './routing'
import serve from './serve'

const { PORT = 3001, HOST = '0.0.0.0' } = process.env
const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify()

routing(server)
serve(server)

const start = async () => {
  try {
    await server.listen(PORT, HOST)
    console.log(`Server listening on port ${PORT}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
