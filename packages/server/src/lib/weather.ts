/* eslint-disable camelcase */
import { WeatherResponse, RapidAPIWeatherResponse } from '@types'
import { FETCH_OPTIONS } from '@lib/constants'

const { API_URL = '' } = process.env

export const getData = async (q: string, days: string = '3'): Promise<RapidAPIWeatherResponse> => {
  const queryString = new URLSearchParams({ q, days }).toString()
  const url = `${API_URL}/current.json?${queryString}`

  const response = await fetch(url, FETCH_OPTIONS)
  const data = await response.json()
  return data
}

export const formatData = (data: RapidAPIWeatherResponse): WeatherResponse => {
  const { location, current } = data
  const { country, name, lat, lon, tz_id } = location
  const { condition, humidity, cloud, feelslike_c, feelslike_f, is_day, temp_c, temp_f, wind_kph, wind_mph, wind_dir, wind_degree, last_updated_epoch } = current
  const { text, icon, code } = condition

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
      condition: {
        id: code,
        name: text.toLowerCase(),
        icon: `https:${icon}`
      },
      lastUpdated: last_updated_epoch * 1000
    }
  }

  return result
}
