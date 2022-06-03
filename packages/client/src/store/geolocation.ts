import type { LocationStatus, GeolocationState, GeoPositionError, GeoPosition } from '@types'
import type { StoreSlice } from '.'

import { DISABLED_TIMEOUT, DEFAULT_GEO_OPTIONS } from '@lib/constants'

export const geolocation: StoreSlice<GeolocationState> = (set, _get): GeolocationState => ({
  loading: true,
  setLoading(loading) {
    set(() => ({ loading }))
  },

  isSupported: navigator && 'geolocation' in navigator,
  setIsSupported(isSupported) {
    set(() => ({ isSupported }))
  },

  coords: null,
  setCoords(coords) {
    set(() => ({ coords }))
  },
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
    }

    const onError = (error: GeoPositionError) => {
      endTime = new Date().getTime()
      const elapsed = endTime - startTime
      let status: LocationStatus

      if (elapsed < DISABLED_TIMEOUT && error.code === error.PERMISSION_DENIED) {
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
        // loading: false,
        coords: null,
        timestamp: null,
        locationStatus: status,
        permission: 'denied'
      }))
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, DEFAULT_GEO_OPTIONS)
  },

  timestamp: null,
  setTimestamp(timestamp) {
    set(() => ({ timestamp }))
  },

  error: null,
  setError(error) {
    set(() => ({ error }))
  },

  locationStatus: 'idle',
  setLocationStatus(locationStatus) {
    set(() => ({ locationStatus }))
  }
})
