import type { FastifyStaticOptions } from '@fastify/static'
import path from 'path'

const root = path.join(__dirname, '../../../../')
const packagesPath = path.join(root, 'packages')
const buildPath = path.join(root, 'dist')
const clientPath = path.join(packagesPath, 'client')

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
