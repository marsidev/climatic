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
exports.formatData = exports.formatCondition = exports.fetchWeatherData = void 0;
const constants_1 = require("@lib/constants");
const { API_URL = '' } = process.env;
const fetchWeatherData = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const { q, days = 3, lang = 'es' } = props;
    const params = { q, days: days.toString(), lang };
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_URL}/current.json?${queryString}`;
    const response = yield fetch(url, constants_1.FETCH_OPTIONS);
    const data = yield response.json();
    return data;
});
exports.fetchWeatherData = fetchWeatherData;
const formatCondition = (condition) => {
    const { text, icon, code } = condition;
    return {
        id: code,
        name: text,
        icon: icon.replace('//cdn.weatherapi.com/weather/64x64', '')
    };
};
exports.formatCondition = formatCondition;
const formatData = (data) => {
    const { location, current } = data;
    const { country, name, lat, lon, tz_id } = location;
    const { condition, humidity, cloud, feelslike_c, feelslike_f, is_day, temp_c, temp_f, wind_kph, wind_mph, wind_dir, wind_degree, last_updated_epoch } = current;
    const timestamp = last_updated_epoch * 1000;
    const result = {
        location: {
            name,
            country,
            timezone: tz_id,
            latitude: lat,
            longitude: lon
        },
        weather: {
            cloud,
            humidity,
            isDay: is_day === 1,
            temperature: {
                celsius: temp_c,
                fahrenheit: temp_f
            },
            feelsLike: {
                celsius: feelslike_c,
                fahrenheit: feelslike_f
            },
            wind: {
                speed: {
                    kph: wind_kph,
                    mph: wind_mph
                },
                direction: wind_dir,
                degree: wind_degree
            },
            condition: (0, exports.formatCondition)(condition),
            updateAt: timestamp,
            updateDateAt: new Date(timestamp).toISOString()
        }
    };
    return result;
};
exports.formatData = formatData;
