import type { FastifyRequest, FastifyReply } from 'fastify'
import type { LoggerOptions as PinoLoggerOptions } from 'pino'

import pino from 'pino'
import { getVersion } from './getVersion'
import config from './config'
import pc from 'picocolors'
import os from 'os'
import { performance } from 'perf_hooks'

interface LogUrl {
  url: string
  label: string
}

const pinoOptions: PinoLoggerOptions = {
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

export const logger = pino(pinoOptions)

const printServerUrls = (
  address: string,
  port: number,
  base: string,
  exposeNet: boolean | undefined
) => {
  const protocol = address.split(':')[0]
  const hostname = 'localhost'
  // const hostname = address.split(`:${PORT}`)[0].split(`${protocol}://`)[1]

  const interfaces = os.networkInterfaces()

  const urls: LogUrl[] = []

  Object.keys(interfaces).forEach(iface => {
    interfaces[iface]?.forEach(detail => {
      if (
        // Node < v18
        (typeof detail.family === 'string' && detail.family === 'IPv4') ||
        // Node >= v18
        (typeof detail.family === 'number' && detail.family === 4)
      ) {
        const host = detail.address.replace('127.0.0.1', hostname)
        const isLocal = detail.address.includes('127.0.0.1')

        const fullUrl = `${protocol}://${host}:${pc.bold(port)}${base}`
        const url = isLocal
          ? pc.yellow(fullUrl)
          : exposeNet
            ? pc.yellow(fullUrl)
            : 'use `--host` to expose'

        const label = isLocal ? 'Local' : 'Network'
        urls.push({ label, url })
      }
    })
  })

  const length = Math.max(...urls.map(({ label }) => label.length))

  const print = (icon: string, label: string, message: string) => {
    const fullMessage = `  ${icon}  ${
      label ? pc.bold(label) + ':' : ' '
    } ${' '.repeat(length - label.length)}${message}`

    console.log(fullMessage)
  }

  urls.forEach(({ label, url: text }) => {
    print(pc.yellow('➜'), label, text)
  })

  console.log()
}

const printStartupDuration = (startTime: number) => {
  console.log(
    pc.yellow(
      `  ✨ ready in ${pc.bold(Math.ceil(performance.now() - startTime))}ms.`
    )
  )
}

export const startupLog = (
  address: string,
  startTime: number,
  exposeNet?: boolean
) => {
  const { NODE_ENV } = process.env
  const { PORT } = config

  const isProd = NODE_ENV === 'production'
  const mode = isProd ? 'prod' : 'dev'
  const baseUrl = '/'

  const appName = 'fastify'
  const appVersion = getVersion(appName)
  const appWithVersion = `${appName}${appVersion ? ` v${appVersion}` : ''}`

  // if (pc.isColorSupported) {
  //   console.log('Yay! This script can use colors and formatters')
  // }

  const app = pc.white(pc.bold(`  🚀 ${appWithVersion}`))
  const runningAt = pc.green(`${mode} server running at:`)

  console.log(`${app} ${runningAt}\n`)
  printServerUrls(address, PORT, baseUrl, exposeNet)
  printStartupDuration(startTime)
}
