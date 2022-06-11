import pino, { LoggerOptions } from 'pino'
import { FastifyRequest, FastifyReply } from 'fastify'

// https://github.com/pinojs/pino/blob/master/docs/api.md#options-object
const options: LoggerOptions = {
  serializers: {
    req(request: FastifyRequest) {
      const { url, method } = request
      return `${method} - ${url}`
    },
    res(response: FastifyReply) {
      const { statusCode } = response
      return `${statusCode}`
    }
  },
  name: 'server',
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: true,
      ignore: 'hostname,pid'
    }
  }
}

export const logger = pino(options)
