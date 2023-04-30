import type { GeolocationState, UserState, ForecastState } from '@types'
import type { StateCreator } from 'zustand'

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { geolocation } from './geolocation'
import { user } from './user'
import { forecast } from './forecast'

export type SliceCreator<T> = StateCreator<StoreState, [], [], T>

export type StoreState = GeolocationState & UserState & ForecastState

const useStoreWithDevTools = create<StoreState>()(
  devtools((...a) => ({
    ...geolocation(...a),
    ...user(...a),
    ...forecast(...a)
  }))
)

const useStoreWithoutDevTools = create<StoreState>((...a) => ({
  ...geolocation(...a),
  ...user(...a),
  ...forecast(...a)
}))

export const useStore =
  process.env.NODE_ENV === 'development'
    ? useStoreWithDevTools
    : useStoreWithoutDevTools

export default useStore

