/* eslint-disable camelcase */
import { ForecastDay_Astro } from '@/types/rapidapi'

interface Temperature {
  celsius: number
  fahrenheit: number
}

interface Condition {
  id: number
  name: string
  icon: string
}

/* Weather */
interface Weather {
  cloud: number
  humidity: number
  isDay: boolean
  temperature: Temperature
  feelsLike: Temperature
  wind: {
    speed: {
      kph: number
      mph: number
    }
    direction: string
    degree: number
  }
  lastUpdated: number
}

export interface WeatherResponse {
  location: {
    name: string
    country: string
    timezone: string
    latitude: number
    longitude: number
  }
  condition: Condition
  weather: Weather
}

/* Forecast */
interface ForecastDay {
  temperature: {
    celsius: {
      min: number
      max: number
      avg: number
    }
    fahrenheit: {
      min: number
      max: number
      avg: number
    }
  }
  wind: {
    speed: {
      kph: number
      mph: number
    }
  }
  precipitation: {
    mm: number
    inches: number
  }
  avgHumidity: number
  condition: Condition
}

export interface Forecast {
  timestamp: number
  day: ForecastDay
  hours: Weather[]
  astro: ForecastDay_Astro
}

// export type ForecastResponse = Forecast[]
export interface ForecastResponse extends Array<Forecast> { }
// export interface ForecastResponse {
//   [index: number]: Forecast
// }
