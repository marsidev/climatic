import type { RapidApiRequestQuery, RapidAPIForecastResponse } from '@types';
export declare const fetchDayForecast: (props: RapidApiRequestQuery) => Promise<RapidAPIForecastResponse>;
export declare const fillNextForecastDays: (data: RapidAPIForecastResponse, params: RapidApiRequestQuery) => Promise<RapidAPIForecastResponse>;
//# sourceMappingURL=dailyForecast.d.ts.map