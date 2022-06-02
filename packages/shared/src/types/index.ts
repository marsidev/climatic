export type MoonPhase = 'New Moon' | 'Waxing Crescent' | 'First Quarter' | 'Waxing Gibbous' | 'Full Moon' | 'Waning Gibbous' | 'Last Quarter' | 'Waning Crescent'

export type Language = 'es-ES' | 'en-US'

export type TemperatureUnit = 'celsius' | 'farenheit'

export type SpeedUnit = 'mph' | 'kph'

export type PressureUnit = 'mb' | 'in'

export interface Dictionary {
  [key: string]: any
}

export interface Astro {
  sunrise: string
  sunset: string
  moonrise: string
  moonset: string
  moon_phase: MoonPhase
  moon_illumination: string
}

export interface Condition {
  id: number
  name: string
  icon: string
}

interface Location {
  name: string
  country: string
  timezone: string
  latitude: number
  longitude: number
}

interface Temperature {
  celsius: number
  fahrenheit: number
}

interface WinSpeed {
  kph: number
  mph: number
}

interface Wind {
  speed: WinSpeed
  direction: string
  degree: number
}

interface Pressure {
  mb: number
  in: number
}

/* Weather */
interface Weather {
  cloud: number
  humidity: number
  isDay: boolean
  temperature: Temperature
  feelsLike: Temperature
  wind: Wind
  pressure: Pressure
  condition: Condition
  updateAt: number
  updateDateAt: string
  uv: number
}

export interface WeatherResponse {
  location: Location
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
  rain: {
    chance: number
    willItRain: boolean
  }
  snow: {
    chance: number
    willItSnow: boolean
  }
  uv: number
}

// type WeatherWithoutTimestamps = Omit<Weather, 'updateAt' | 'updateDateAt'>
interface ForecastHour extends Omit<Weather, 'updateAt' | 'updateDateAt'> {
  hour: number
  rain: {
    chance: number
    willItRain: boolean
  }
  snow: {
    chance: number
    willItSnow: boolean
  }
  timestamp: number
  date: string
}

export interface Forecast {
  timestamp: number
  date: string
  day: ForecastDay
  hours: ForecastHour[]
  astro: Astro
}

export interface ForecastResponse {
  location: Location
  currentWeather: Weather
  forecast: Forecast[]
}

export interface SearchItem {
  id: string
  name: string
  region: string
  country: string
  lat: number
  lon: number
  url: string
}

export type SearchResponse = SearchItem[]
