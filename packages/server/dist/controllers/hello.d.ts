import { FastifyInstance, FastifyPluginOptions } from 'fastify';
declare const router: (server: FastifyInstance, opts: FastifyPluginOptions) => Promise<void>;
export default router;
