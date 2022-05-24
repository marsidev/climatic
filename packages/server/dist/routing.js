"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("@controllers/index");
const routing = (server) => {
    const { register } = server;
    register(index_1.ping, { prefix: '/api/ping' });
    register(index_1.getWeather, { prefix: '/api/weather' });
    register(index_1.getForecast, { prefix: '/api/forecast' });
    server.after(err => err ? console.log(err) : console.log('Routes are ready.'));
};
exports.default = routing;
