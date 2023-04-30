import type { LocationStatus, GeolocationState, GeoPositionError, GeoPosition } from '@types'
import type { SliceCreator } from '.'

import { DISABLED_TIMEOUT, DEFAULT_GEO_OPTIONS } from '@lib/config'

export const geolocation: SliceCreator<GeolocationState> = set => ({
  loading: true,

  isSupported: navigator && 'geolocation' in navigator,

  coords: null,
  getCoords() {
    let startTime: number
    let endTime: number

    const onSuccess = (position: GeoPosition) => {
      const { coords } = position
      const latitude = Number(coords.latitude.toFixed(4))
      const longitude = Number(coords.longitude.toFixed(4))

      set(() => ({
        coords: { latitude, longitude },
        timestamp: position.timestamp,
        loading: false,
        error: null,
        locationStatus: 'success'
      }))

      return coords
    }

    const onError = (error: GeoPositionError) => {
      endTime = new Date().getTime()
      const elapsed = endTime - startTime
      let status: LocationStatus

      if (elapsed < DISABLED_TIMEOUT && error.code === error.PERMISSION_DENIED) {
        // it got denied too fast, so we assume it's a device with location disabled
        status = 'off'
      } else if (error.code === error.PERMISSION_DENIED) {
        status = 'denied'
      } else if (error.code === (error.TIMEOUT || error.POSITION_UNAVAILABLE)) {
        status = 'not_supported'
      } else {
        status = 'error'
      }

      set(() => ({
        error,
        coords: null,
        timestamp: null,
        locationStatus: status,
        permission: 'denied'
      }))
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => resolve(onSuccess(position)),
        error => reject(onError(error)),
        DEFAULT_GEO_OPTIONS
      )
    })
  },

  timestamp: null,
  error: null,
  locationStatus: 'idle'
})
