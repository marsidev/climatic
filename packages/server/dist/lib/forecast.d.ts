import type { RapidAPIForecastResponse, ForecastResponse, RapidApiRequestQuery, RapidAPIForecastDay } from '@types';
export declare const fetchForecastData: (props: RapidApiRequestQuery) => Promise<RapidAPIForecastResponse>;
export declare const formatForecastData: (data: RapidAPIForecastDay) => {
    timestamp: number;
    date: string;
    day: {
        temperature: {
            celsius: {
                max: number;
                min: number;
                avg: number;
            };
            fahrenheit: {
                max: number;
                min: number;
                avg: number;
            };
        };
        wind: {
            speed: {
                mph: number;
                kph: number;
            };
        };
        precipitation: {
            mm: number;
            inches: number;
        };
        avgHumidity: number;
        condition: import("@types").Condition;
        rain: {
            chance: number;
            willItRain: boolean;
        };
        snow: {
            chance: number;
            willItSnow: boolean;
        };
    };
    hours: {
        hour: number;
        condition: import("@types").Condition;
        cloud: number;
        humidity: number;
        isDay: boolean;
        temperature: {
            celsius: number;
            fahrenheit: number;
        };
        feelsLike: {
            celsius: number;
            fahrenheit: number;
        };
        wind: {
            speed: {
                kph: number;
                mph: number;
            };
            direction: string;
            degree: number;
        };
        rain: {
            chance: number;
            willItRain: boolean;
        };
        snow: {
            chance: number;
            willItSnow: boolean;
        };
        timestamp: number;
        date: string;
    }[];
    astro: import("@types").RapidAPIForecastDayAstro;
};
export declare const formatData: (data: RapidAPIForecastResponse) => ForecastResponse;
//# sourceMappingURL=forecast.d.ts.map