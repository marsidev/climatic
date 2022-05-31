/* eslint-disable no-undef */
import type { LocationStatus, GeolocationState } from '@types'
import type { StoreSlice } from '.'
import { DISABLED_TIMEOUT } from '@lib/constants'

const DEFAULT_GEO_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 6000000
}

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

    const onSuccess = (position: GeolocationPosition) => {
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

    const onError = (error: GeolocationPositionError) => {
      endTime = new Date().getTime()
      const elapsed = endTime - startTime
      let status: LocationStatus

      if (elapsed < DISABLED_TIMEOUT && error.code === error.PERMISSION_DENIED) {
        status = 'off'
        // toast('Parece que tienes la geolocalización desactivada.')
      } else if (error.code === error.PERMISSION_DENIED) {
        status = 'denied'
        // toast('Has denegado el acceso a tu ubicación.')
      } else if (error.code === (error.TIMEOUT || error.POSITION_UNAVAILABLE)) {
        status = 'not_supported'
        // toast('No se puede obtener tu ubicación.')
      } else {
        status = 'error'
        // toast('Ha ocurrido un error al obtener tu ubicación.')
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
