import { FastifyInstance } from 'fastify'
import statics from '@fastify/static'
import path from 'path'

export default (server: FastifyInstance): void => {
  const clientBuildPath: string = path.join(__dirname, '../../../public')

  server.register(statics, {
    root: clientBuildPath,
    prefix: '/'
  })
}
