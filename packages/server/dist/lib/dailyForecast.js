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
exports.fillNextForecastDays = exports.fetchDayForecast = void 0;
const constants_1 = require("@lib/constants");
const { API_URL = '' } = process.env;
const OneDayInSeconds = 86400;
const MAX_FORECAST_DAYS = 8;
const fetchDayForecast = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const { q, dt = '', lang = 'es' } = props;
    const params = { q, dt, lang };
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_URL}/forecast.json?${queryString}`;
    const response = yield fetch(url, constants_1.FETCH_OPTIONS);
    const data = yield response.json();
    return data;
});
exports.fetchDayForecast = fetchDayForecast;
const fillNextForecastDays = (data, params) => __awaiter(void 0, void 0, void 0, function* () {
    let { days } = params;
    days = Number(days) > MAX_FORECAST_DAYS
        ? MAX_FORECAST_DAYS
        : Number(days);
    const forecastCount = data.forecast.forecastday.length;
    const daysToFill = days - forecastCount;
    for (let i = 0; i < daysToFill; i++) {
        const tempForecast = data.forecast.forecastday;
        const lastForecastTime = tempForecast[tempForecast.length - 1].date_epoch;
        if (lastForecastTime) {
            const nextForecastTime = (lastForecastTime + OneDayInSeconds) * 1000;
            const nextForecastDate = new Date(nextForecastTime).toISOString();
            const dt = nextForecastDate.substring(0, 10);
            const nextForecast = yield (0, exports.fetchDayForecast)(Object.assign(Object.assign({}, params), { dt }));
            const nextForecastData = nextForecast.forecast.forecastday[0];
            data.forecast.forecastday.push(nextForecastData);
        }
    }
    return data;
});
exports.fillNextForecastDays = fillNextForecastDays;
