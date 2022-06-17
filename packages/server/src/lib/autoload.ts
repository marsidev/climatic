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

  try {
    const files = await readdir(dir, { withFileTypes: true })
    for (const file of files) {
      const { name: fileName } = file
      if (
        file.isFile() &&
        (fileName.endsWith('.ts') || fileName.endsWith('.js'))
      ) {
        const fullFilePath = `${dir}\\${fileName}`
        app.register(import(fullFilePath), registerOptions)
      }
    }
  } catch (error) {
    console.error('Error loading autoload files:', error)
  }
}

export default autoload
