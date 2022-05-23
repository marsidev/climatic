import type { FetchOptions } from '@types'

const { RAPIDAPI_KEY = '', RAPIDAPI_HOST = '' } = process.env

export const FETCH_OPTIONS: FetchOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': RAPIDAPI_HOST,
    'X-RapidAPI-Key': RAPIDAPI_KEY
  }
}
