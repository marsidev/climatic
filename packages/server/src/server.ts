import buildApp from '@app'
import config from '@lib/config'
import { logger } from '@lib'

const runServer = async () => {
  const { PORT: port, HOST: host } = config
  const app = await buildApp({ logger })

  app.listen({ port, host }, async err => {
    if (err) return console.error(err)

    console.log(`Server running on http://localhost:${port}`)
  })
}

runServer()
