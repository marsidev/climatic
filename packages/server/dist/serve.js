"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const static_1 = __importDefault(require("@fastify/static"));
const path_1 = __importDefault(require("path"));
exports.default = (server) => {
    const clientBuildPath = path_1.default.join(__dirname, '../../../public');
    server.register(static_1.default, {
        root: clientBuildPath,
        prefix: '/'
    });
    server.after(err => err ? console.log(err) : console.log('Static client serving is ready.'));
};
