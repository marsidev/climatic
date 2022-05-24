"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const node_cache_1 = __importDefault(require("node-cache"));
const CACHE_TTL = 900;
let CACHE_KEY;
const CACHE_OPTIONS = {
    stdTTL: CACHE_TTL,
    checkperiod: CACHE_TTL * 2
};
const CacheInstance = new node_cache_1.default(CACHE_OPTIONS);
function cache(server, _options) {
    return __awaiter(this, void 0, void 0, function* () {
        server.addHook('onRequest', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            if (request.method === 'GET') {
                CACHE_KEY = `${request.method}-${request.url}`;
                const cached = CacheInstance.get(CACHE_KEY);
                if (cached !== undefined) {
                    console.log('RETURNING FROM CACHE FOR KEY', CACHE_KEY);
                    reply.send(cached);
                }
            }
        }));
        server.addHook('onSend', (request, reply, payload, done) => {
            if (request.method === 'GET') {
                CACHE_KEY = `${request.method}-${request.url}`;
                const response = CacheInstance.get(CACHE_KEY);
                if (response === undefined && reply.statusCode < 400) {
                    console.log('CACHING RESPONSE FOR KEY', CACHE_KEY);
                    CacheInstance.set(CACHE_KEY, payload, CACHE_TTL);
                }
            }
            done();
        });
        server.after(err => err ? console.log(err) : console.log('Cache plugin is ready.'));
    });
}
exports.default = (0, fastify_plugin_1.default)(cache);
