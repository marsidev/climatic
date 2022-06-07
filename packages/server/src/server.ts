import buildApp from './app'

const { PORT = 3001, HOST = '0.0.0.0' } = process.env

const runServer = async () => {
  const app = await buildApp({ logger: false })

  app.listen(PORT, HOST, async (err, address) => {
    if (err) return console.error(err)
    console.log(`Server running on ${address}`)
  })
}

runServer()
