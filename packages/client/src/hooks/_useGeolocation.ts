/* eslint-disable no-undef */
import { useEffect, useState } from 'react'
import type { GeolocationOptions, useGeolocationProps } from '@types'

export const useGeolocation = (options: GeolocationOptions = {}): useGeolocationProps => {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<GeolocationPositionError | null>(null)
  const [coords, setCoords] = useState<GeolocationCoordinates | null>(null)
  const [timestamp, setTimestamp] = useState<number | null>(null)

  const {
    enableHighAccuracy = true,
    maximumAge = 30000,
    timeout = 6000000,
    enabled = true
  } = options

  const isSupported: boolean = navigator && 'geolocation' in navigator

  const locationOptions: PositionOptions = { enableHighAccuracy, maximumAge, timeout }

  const onSuccess = (position: GeolocationPosition) => {
    setLoading(false)
    setError(null)
    setCoords(position.coords)
    setTimestamp(position.timestamp)
  }

  const onError = (error: GeolocationPositionError) => {
    setLoading(false)
    setError(error)
    setCoords(null)
    setTimestamp(null)
  }

  useEffect(() => {
    if (isSupported && enabled) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, locationOptions)
    }
  }, [enabled])

  return {
    isSupported,
    coords,
    timestamp,
    loading,
    error
  }
}

export default useGeolocation
