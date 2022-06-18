import type { FastifyRequest, FastifyReply } from 'fastify'
import pino, { LoggerOptions } from 'pino'
import { getVersion } from './getVersion'
import config from './config'
import pc from 'picocolors'

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

export const runningLog = () => {
  const { NODE_ENV } = process.env
  const { PORT } = config

  const isProd = NODE_ENV === 'production'
  const mode = isProd ? 'prod' : 'dev'
  const address = `http://localhost:${PORT}/`

  const versionIndex = getVersion('fastify')

  const fastify = versionIndex
    ? pc.bold(`fastify v${versionIndex}`)
    : pc.bold('fastify')

  const runningAt = pc.magenta(`${mode} server running at ${address}`)
  const message = `🚀 ${fastify} ${runningAt}`
  console.log(message)
}
