import type { WeatherResponse, RapidAPIWeatherResponse, RapidAPICondition, Condition, RapidApiRequestQuery } from '@types'

import { FETCH_OPTIONS } from '@lib/constants'

const { API_URL = '' } = process.env

export const fetchWeatherData = async (props: RapidApiRequestQuery): Promise<RapidAPIWeatherResponse> => {
  const { q, days = 3, lang = 'es' }: RapidApiRequestQuery = props

  const params = { q, days: days.toString(), lang }
  const queryString = new URLSearchParams(params).toString()
  const url = `${API_URL}/current.json?${queryString}`

  const response = await fetch(url, FETCH_OPTIONS)
  const data: RapidAPIWeatherResponse = await response.json()
  return data
}

export const formatCondition = (condition: RapidAPICondition): Condition => {
  const { text, icon, code } = condition
  return {
    id: code,
    name: text,
    icon: icon.replace('//cdn.weatherapi.com/weather/64x64', '')
  }
}

export const formatData = (data: RapidAPIWeatherResponse): WeatherResponse => {
  const { location, current } = data
  const { country, name, lat, lon, tz_id } = location
  const { condition, humidity, cloud, feelslike_c, feelslike_f, is_day, temp_c, temp_f, wind_kph, wind_mph, wind_dir, wind_degree, last_updated_epoch } = current

  const timestamp = last_updated_epoch * 1000

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
      condition: formatCondition(condition),
      updateAt: timestamp,
      updateDateAt: new Date(timestamp).toISOString()
    }
  }

  return result
}
