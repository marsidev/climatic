/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { LoggerOptions as PinoLoggerOptions } from 'pino'
import os from 'os'
import { performance } from 'perf_hooks'
import pino from 'pino'
import pc from 'picocolors'
import pretty from 'pino-pretty'
import config from './config'

interface LogUrl {
	url: string
	label: string
}

const stream = pretty({
	colorize: true,
	translateTime: true,
	ignore: 'hostname,pid'
})

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
	level: 'info'
}

export const logger = pino(pinoOptions, stream)

const printServerUrls = (
	address: string,
	port: number,
	base: string,
	exposeNet = false,
	withColors = true
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
				(typeof detail.family === 'string' && detail.family === 'IPv4')
				// Node >= v18
				// @ts-ignore
				|| (typeof detail.family === 'number' && detail.family === 4)
			) {
				const host = detail.address.replace('127.0.0.1', hostname)
				const isLocal = detail.address.includes('127.0.0.1')

				const fullUrl = withColors
					? pc.yellow(`${protocol}://${host}:${pc.bold(port)}${base}`)
					: `${protocol}://${host}:${port}${base}`

				const url = isLocal
					? fullUrl
					: exposeNet
						? fullUrl
						: 'use `--host` to expose'

				const label = isLocal ? 'Local' : 'Network'
				urls.push({ label, url })
			}
		})
	})

	const length = Math.max(...urls.map(({ label }) => label.length))

	const print = (icon: string, label: string, message: string) => {
		const formattedLabel = withColors ? pc.bold(label) : label
		const formattedIcon = withColors ? pc.yellow(icon) : icon

		const fullMessage = `  ${formattedIcon}  ${
			label ? `${formattedLabel}:` : ' '
		} ${' '.repeat(length - label.length)}${message}`

		console.log(fullMessage)
	}

	urls.forEach(({ label, url: text }) => {
		print(withColors ? '➜' : '>', label, text)
	})

	console.log()
}

const printStartupDuration = (
	startTime: number,
	withColors = true
) => {
	const time = Math.ceil(performance.now() - startTime)

	const message = withColors
		? pc.yellow(`  ✨ ready in ${pc.bold(time)}ms.`)
		: `  ready in ${time}ms.`

	console.log(message)
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

	const withColors = pc.isColorSupported

	const app = withColors
		? pc.white(pc.bold(`  🚀 ${appName}`))
		: `  ${appName}`

	const runningAt = withColors
		? pc.green(`${mode} server running at:`)
		: `${mode} server running at:`

	console.log(`${app} ${runningAt}\n`)
	printServerUrls(address, PORT, baseUrl, exposeNet, withColors)
	printStartupDuration(startTime, withColors)
}
