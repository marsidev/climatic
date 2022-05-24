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
exports.formatData = exports.formatForecastData = exports.fetchForecastData = void 0;
const constants_1 = require("@lib/constants");
const weather_1 = require("@lib/weather");
const dailyForecast_1 = require("@lib/dailyForecast");
const { API_URL = '' } = process.env;
const fetchForecastData = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const { q, days = 3, lang = 'es' } = props;
    const params = { q, days: days.toString(), lang };
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_URL}/forecast.json?${queryString}`;
    const response = yield fetch(url, constants_1.FETCH_OPTIONS);
    const _data = yield response.json();
    const data = (0, dailyForecast_1.fillNextForecastDays)(_data, { q, days, lang });
    return data;
});
exports.fetchForecastData = fetchForecastData;
const formatDayData = (day) => {
    const { maxtemp_c, maxtemp_f, mintemp_c, mintemp_f, avgtemp_c, avgtemp_f, maxwind_mph, maxwind_kph, totalprecip_mm, totalprecip_in, avghumidity, condition, daily_will_it_rain, daily_chance_of_rain, daily_will_it_snow, daily_chance_of_snow } = day;
    return {
        temperature: {
            celsius: {
                max: maxtemp_c,
                min: mintemp_c,
                avg: avgtemp_c
            },
            fahrenheit: {
                max: maxtemp_f,
                min: mintemp_f,
                avg: avgtemp_f
            }
        },
        wind: {
            speed: {
                mph: maxwind_mph,
                kph: maxwind_kph
            }
        },
        precipitation: {
            mm: totalprecip_mm,
            inches: totalprecip_in
        },
        avgHumidity: avghumidity,
        condition: (0, weather_1.formatCondition)(condition),
        rain: {
            chance: daily_chance_of_rain,
            willItRain: daily_will_it_rain === 1
        },
        snow: {
            chance: daily_chance_of_snow,
            willItSnow: daily_will_it_snow === 1
        }
    };
};
const formatHoursData = (hours) => {
    const result = hours.map((hour, i) => {
        const { condition, humidity, cloud, feelslike_c, feelslike_f, is_day, temp_c, temp_f, wind_kph, wind_mph, wind_dir, wind_degree, time_epoch, will_it_rain, chance_of_rain, will_it_snow, chance_of_snow } = hour;
        return {
            hour: i,
            condition: (0, weather_1.formatCondition)(condition),
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
            rain: {
                chance: chance_of_rain,
                willItRain: will_it_rain === 1
            },
            snow: {
                chance: chance_of_snow,
                willItSnow: will_it_snow === 1
            },
            timestamp: time_epoch * 1000,
            date: new Date(time_epoch * 1000).toString()
        };
    });
    return result;
};
const formatForecastData = (data) => {
    const { date_epoch, day, hour, astro, date } = data;
    const dayData = formatDayData(day);
    const hoursData = formatHoursData(hour);
    return {
        timestamp: date_epoch * 1000,
        date,
        day: dayData,
        hours: hoursData,
        astro
    };
};
exports.formatForecastData = formatForecastData;
const formatData = (data) => {
    const { forecast: { forecastday }, location, current } = data;
    const { location: locationFormatted, weather: currentWeather } = (0, weather_1.formatData)({ location, current });
    const forecast = forecastday.map(foreData => {
        return (0, exports.formatForecastData)(foreData);
    });
    const result = {
        location: locationFormatted,
        currentWeather,
        forecast
    };
    return result;
};
exports.formatData = formatData;
