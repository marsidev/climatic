import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { readdir } from 'fs/promises'
import { extname } from 'node:path'

interface AutoloadPluginOptions {
	dir: string
	options?: FastifyPluginOptions
}

const validExtensions = ['.js', '.cjs', 'mjs', '.ts', '.cts', '.mts']

const autoload = async (app: FastifyInstance, options: AutoloadPluginOptions) => {
	const { dir, options: registerOptions = {} } = options

	try {
		const files = await readdir(dir, { withFileTypes: true })
		for (const file of files) {
			const { name: fileName } = file
			const ext = extname(fileName)

			if (file.isFile() && validExtensions.includes(ext)) {
				const fullFilePath = `${dir}/${fileName}`
				app.register(import(fullFilePath), registerOptions)
			}
		}
	} catch (error) {
		console.error('Error loading autoload files:', error)
	}
}

export default autoload
