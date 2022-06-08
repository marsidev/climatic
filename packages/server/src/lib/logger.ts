import pino from 'pino'

// https://github.com/pinojs/pino/blob/master/docs/api.md#options-object
export const logger = pino({
  serializers: {
    req(request) {
      const { url, method } = request
      return `${method} - ${url}`
    },
    res(response) {
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
})
