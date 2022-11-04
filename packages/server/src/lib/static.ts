import type { FastifyStaticOptions } from '@fastify/static'
import path from 'node:path'

const root = path.join(__dirname, '../../../../')
const packagesPath = path.join(root, 'packages')
const clientPath = path.join(packagesPath, 'client')
const buildPath = path.join(packagesPath, 'client', 'dist')

export const html = path.join(buildPath, 'index.html')

export const assetsConfig: FastifyStaticOptions = {
	root: path.join(buildPath, 'assets'),
	prefix: '/assets',
	cacheControl: false,
	decorateReply: false
}

export const clientAssetsConfig: FastifyStaticOptions = {
	root: path.join(clientPath, 'src/assets'),
	prefix: '/server-assets/',
	cacheControl: false,
	decorateReply: false
}
