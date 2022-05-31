import type { FetchOptions } from '@types'

const { RAPIDAPI_KEY = '' } = process.env

export const RAPIDAPI_HOST: string = 'weatherapi-com.p.rapidapi.com'

export const API_URL: string = `https://${RAPIDAPI_HOST}`

export const FETCH_OPTIONS: FetchOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': RAPIDAPI_HOST,
    'X-RapidAPI-Key': RAPIDAPI_KEY
  }
}
