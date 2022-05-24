import type { WeatherResponse, RapidAPIWeatherResponse, RapidAPICondition, Condition, RapidApiRequestQuery } from '@types';
export declare const fetchWeatherData: (props: RapidApiRequestQuery) => Promise<RapidAPIWeatherResponse>;
export declare const formatCondition: (condition: RapidAPICondition) => Condition;
export declare const formatData: (data: RapidAPIWeatherResponse) => WeatherResponse;
//# sourceMappingURL=weather.d.ts.map