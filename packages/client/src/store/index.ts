import type { GetState, SetState } from 'zustand'

import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { geolocation, GeolocationState } from './geolocation'
import { user, UserState } from './user'
import { forecast, ForecastState } from './forecast'

export type StoreSlice<T> = (
  set: SetState<any>,
  get: GetState<any>,
) => T

export type StoreState = GeolocationState & UserState & ForecastState

const useStoreWithDevTools = create<StoreState>()(
  devtools((set, get) => ({
    ...geolocation(set, get),
    ...user(set, get),
    ...forecast(set, get)
  }))
)

const useStoreWithoutDevTools = create<StoreState>((set, get) => ({
  ...geolocation(set, get),
  ...user(set, get),
  ...forecast(set, get)
}))

export const useStore =
  process.env.NODE_ENV === 'development'
    ? useStoreWithDevTools
    : useStoreWithoutDevTools

export default useStore

