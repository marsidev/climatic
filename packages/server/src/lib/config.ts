import 'dotenv/config'
import type { FetchOptions } from '@types'
import { loadEnvironmentVariable } from './env'

const RAPIDAPI_HOST = 'weatherapi-com.p.rapidapi.com'

const RAPIDAPI_KEY = loadEnvironmentVariable('RAPIDAPI_KEY')

const API_URL = `https://${RAPIDAPI_HOST}`

const APP_URL = loadEnvironmentVariable('APP_URL', false)

const FETCH_OPTIONS: FetchOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': RAPIDAPI_HOST,
    'X-RapidAPI-Key': RAPIDAPI_KEY
  }
}

const { NODE_ENV } = process.env

export default {
  PORT: 3001,
  HOST: NODE_ENV === 'development' ? '::' : '0.0.0.0',
  RAPIDAPI_KEY,
  FETCH_OPTIONS,
  APP_URL,
  RAPIDAPI_HOST,
  API_URL
}
