import type { FastifyPluginOptions, FastifyInstance } from 'fastify'
import { readdir } from 'fs/promises'

interface AutoloadPluginOptions {
  dir: string
  options?: FastifyPluginOptions
}

const autoload = async (app: FastifyInstance, options: AutoloadPluginOptions) => {
  const {
    dir,
    options: registerOptions = {}
  } = options

  const list = await readdir(dir, { withFileTypes: true })

  list.forEach(file => {
    const fullFilePath = `${dir}\\${file.name}`
    app.register(import(fullFilePath), registerOptions)
  })
}

export default autoload
