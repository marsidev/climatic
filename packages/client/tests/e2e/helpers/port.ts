import { createServer } from 'net'

const APP_PORT = 3000
const API_PORT = 3001

export const isPortAvailable = (port: number) => new Promise<boolean>((resolve, reject) => {
  const server = createServer()
    .once('error', (err: any) => (err.code === 'EADDRINUSE' ? resolve(false) : reject(err)))
    .once('listening', () => server.close())
    .once('close', () => resolve(true))
    .listen(port)
})

export const checkAppIsRunning = async () => {
  if (await isPortAvailable(API_PORT)) {
    throw new Error('Server is not running')
  }

  if (await isPortAvailable(APP_PORT)) {
    throw new Error('App is not running')
  }
}
