/* eslint-disable camelcase */
import { RapidAPIForecastResponse, ForecastDay_Day, ForecastHour, ForecastResponse } from '@types'
import { FETCH_OPTIONS } from '@lib/constants'

const { API_URL = '' } = process.env

export const getData = async (q: string, days: string = '3'): Promise<RapidAPIForecastResponse> => {
  const queryString = new URLSearchParams({ q, days }).toString()
  const url = `${API_URL}/forecast.json?${queryString}`

  const response = await fetch(url, FETCH_OPTIONS)
  const data = await response.json()
  return data
}

const formatDayData = (day: ForecastDay_Day) => {
  const { maxtemp_c, maxtemp_f, mintemp_c, mintemp_f, avgtemp_c, avgtemp_f, maxwind_mph, maxwind_kph, totalprecip_mm, totalprecip_in, avghumidity, condition } = day

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
    }
  }
}

// this function is almost the same as the one in weather.ts - refactor later
const formatHoursData = (hours: ForecastHour[]) => {
  const result = hours.map(hour => {
    const { condition, humidity, cloud, feelslike_c, feelslike_f, is_day, temp_c, temp_f, wind_kph, wind_mph, wind_dir, wind_degree, time_epoch } = hour

    const { text, icon, code } = condition

    return {
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
      lastUpdated: time_epoch * 1000
    }
  })
  return result
}

// type and assign ForecastResponse
export const formatData = (data: RapidAPIForecastResponse): ForecastResponse => {
  const { forecast: { forecastday } } = data

  const result = forecastday.map(fd => {
    const { date_epoch, day, hour, astro } = fd

    const dayData = formatDayData(day)
    const hoursData = formatHoursData(hour)

    return {
      timestamp: date_epoch * 1000,
      day: dayData,
      hours: hoursData,
      astro
    }
  })

  return result
}
