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
require("dotenv/config");
require("isomorphic-fetch");
const fastify_1 = __importDefault(require("fastify"));
const routing_1 = __importDefault(require("./routing"));
const serve_1 = __importDefault(require("./serve"));
const cache_1 = __importDefault(require("./plugins/cache"));
const { PORT = 3001, HOST = '0.0.0.0' } = process.env;
const server = (0, fastify_1.default)();
(0, routing_1.default)(server);
(0, serve_1.default)(server);
server.register(cache_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server.listen(PORT, HOST);
        console.log(`Server listening on port ${PORT}`);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
});
start();
