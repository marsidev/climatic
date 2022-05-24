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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeather = void 0;
const weather_1 = require("@lib/weather");
const getWeather = (server, opts) => __awaiter(void 0, void 0, void 0, function* () {
    server.get('/', opts, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
        const { query } = request;
        const { q = 'Los Angeles', original = '0' } = query;
        const weatherData = yield (0, weather_1.fetchWeatherData)({ q });
        if (original === '1') {
            return reply.send(weatherData);
        }
        const data = (0, weather_1.formatData)(weatherData);
        return reply.send(data);
    }));
});
exports.getWeather = getWeather;
exports.default = exports.getWeather;
