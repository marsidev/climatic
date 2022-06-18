import buildApp from '@app'
import config from '@lib/config'
import { logger as pino, runningLog } from '@lib/logger'

const runServer = async () => {
  const { PORT: port, HOST: host } = config

  const args = process.argv.slice(2)
  const showLogger = args.includes('--log')
  const logger = showLogger ? pino : false

  const app = await buildApp({ logger })

  app.listen({ port, host }, async err => {
    if (err) return console.error(err)
    runningLog()
  })
}

runServer()
