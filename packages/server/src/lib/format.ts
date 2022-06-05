import type { RapidAPIWeatherResponse, RapidAPICondition, RapidAPIForecastResponse, RapidAPIForecastDaySummary, RapidAPIForecastHour, RapidAPIForecastDay } from '@types'
import type { WeatherResponse, Condition, ForecastResponse } from '@climatic/shared'

import '@climatic/shared/src/utils/strings'

// weather formatters
export const formatCondition = (condition: RapidAPICondition): Condition => {
  const { text, icon, code } = condition
  return {
    id: code,
    name: text,
    icon: icon.replace('//cdn.weatherapi.com/weather/64x64', '')
  }
}

export const formatWeatherData = (data: RapidAPIWeatherResponse): WeatherResponse => {
  const { location, current } = data
  const { country, name, lat, lon, tz_id } = location
  const { condition, humidity, cloud, feelslike_c, feelslike_f, is_day, temp_c, temp_f, wind_kph, wind_mph, wind_dir, wind_degree, last_updated_epoch, pressure_in, pressure_mb, uv } = current

  const timestamp = last_updated_epoch * 1000

  const result: WeatherResponse = {
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
      pressure: {
        mb: pressure_mb,
        in: pressure_in
      },
      uv,
      condition: formatCondition(condition),
      updateAt: timestamp,
      updateDateAt: new Date(timestamp).toISOString()
    }
  }

  return result
}

// forecast formatters
const formatDaySummary = (day: RapidAPIForecastDaySummary) => {
  const { maxtemp_c, maxtemp_f, mintemp_c, mintemp_f, avgtemp_c, avgtemp_f, maxwind_mph, maxwind_kph, totalprecip_mm, totalprecip_in, avghumidity, condition, daily_will_it_rain, daily_chance_of_rain, daily_will_it_snow, daily_chance_of_snow, uv } = day

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
    condition: formatCondition(condition),
    rain: {
      chance: daily_chance_of_rain,
      willItRain: daily_will_it_rain === 1
    },
    snow: {
      chance: daily_chance_of_snow,
      willItSnow: daily_will_it_snow === 1
    },
    uv
  }
}

const formatHoursData = (hours: RapidAPIForecastHour[]) => {
  const result = hours.map((hour, i) => {
    const { condition, humidity, cloud, feelslike_c, feelslike_f, is_day, temp_c, temp_f, wind_kph, wind_mph, wind_dir, wind_degree, time_epoch, will_it_rain, chance_of_rain, will_it_snow, chance_of_snow, pressure_in, pressure_mb, uv } = hour

    return {
      hour: i,
      condition: formatCondition(condition),
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
      pressure: {
        mb: pressure_mb,
        in: pressure_in
      },
      rain: {
        chance: chance_of_rain,
        willItRain: will_it_rain === 1
      },
      snow: {
        chance: chance_of_snow,
        willItSnow: will_it_snow === 1
      },
      uv,
      timestamp: time_epoch * 1000,
      date: new Date(time_epoch * 1000).toString()
    }
  })
  return result
}

export const formatForecastDay = (data: RapidAPIForecastDay) => {
  const { date_epoch, day, hour, astro, date } = data

  const dayData = formatDaySummary(day)
  const hoursData = formatHoursData(hour)

  return {
    timestamp: date_epoch * 1000,
    date,
    day: dayData,
    hours: hoursData,
    astro
  }
}

export const formatForecastData = (data: RapidAPIForecastResponse): ForecastResponse => {
  const { forecast: { forecastday }, location, current } = data

  const { location: locationFormatted, weather: currentWeather } = formatWeatherData({ location, current })

  const forecast = forecastday.map(foreData => {
    return formatForecastDay(foreData)
  })

  const result: ForecastResponse = {
    location: locationFormatted,
    currentWeather,
    forecast
  }

  return result
}

export const formatQuery = (q: string): string => {
  return q
    .toLowerCase()
    .trim()
    .replaceSpecialChars(' ')
    .replaceExtraSpaces()
    .replaceDiacritics()
    .replaceSpecialChars()
    .replaceSpaces('-')
}
