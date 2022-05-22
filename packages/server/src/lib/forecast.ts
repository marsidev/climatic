import { RapidAPIForecastResponse, ForecastDaySummary, ForecastHour, ForecastResponse } from '@types'
import { FETCH_OPTIONS } from '@lib/constants'
import { formatData as formatWeatherData } from './weather'

const { API_URL = '' } = process.env

export const getData = async (q: string, days: string = '3'): Promise<RapidAPIForecastResponse> => {
  const queryString = new URLSearchParams({ q, days }).toString()
  const url = `${API_URL}/forecast.json?${queryString}`

  const response = await fetch(url, FETCH_OPTIONS)
  const data = await response.json()
  return data
}

const formatDayData = (day: ForecastDaySummary) => {
  const { maxtemp_c, maxtemp_f, mintemp_c, mintemp_f, avgtemp_c, avgtemp_f, maxwind_mph, maxwind_kph, totalprecip_mm, totalprecip_in, avghumidity, condition, daily_will_it_rain, daily_chance_of_rain, daily_will_it_snow, daily_chance_of_snow } = day

  const { text, icon, code } = condition

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
    condition: {
      id: code,
      name: text.toLowerCase(),
      icon: `https:${icon}`
    },
    rain: {
      chance: daily_chance_of_rain,
      willItRain: daily_will_it_rain === 1
    },
    snow: {
      chance: daily_chance_of_snow,
      willItSnow: daily_will_it_snow === 1
    }
  }
}

// this function is almost the same as the one in weather.ts - refactor later
const formatHoursData = (hours: ForecastHour[]) => {
  const result = hours.map((hour, i) => {
    const { condition, humidity, cloud, feelslike_c, feelslike_f, is_day, temp_c, temp_f, wind_kph, wind_mph, wind_dir, wind_degree, time_epoch, will_it_rain, chance_of_rain, will_it_snow, chance_of_snow } = hour

    const { text, icon, code } = condition

    return {
      hour: i,
      condition: {
        id: code,
        name: text.toLowerCase(),
        icon: `https:${icon}`
      },
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
    }
  })
  return result
}

// type and assign ForecastResponse
export const formatData = (data: RapidAPIForecastResponse): ForecastResponse => {
  const { forecast: { forecastday }, location, current } = data

  const { location: locationFormatted, weather: currentWeather } = formatWeatherData({ location, current })

  const forecast = forecastday.map(fd => {
    const { date_epoch, day, hour, astro } = fd

    const dayData = formatDayData(day)
    const hoursData = formatHoursData(hour)

    return {
      timestamp: date_epoch * 1000,
      date: new Date(date_epoch * 1000).toString(),
      day: dayData,
      hours: hoursData,
      astro
    }
  })

  const result = {
    location: locationFormatted,
    currentWeather,
    forecast
  }

  return result
}
