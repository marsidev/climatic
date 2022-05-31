/* eslint-disable no-undef */
import type { GeoPermission, LocationStatus, Location } from '@types'

import { useCallback, useEffect, useState } from 'react'
import { getPermissionFromLocalStorage, savePermissionToLocalStorage } from '@lib'
import { toast } from 'react-toastify'
import { useGeolocation } from '@hooks'

const DISABLED_TIMEOUT: number = 1000

export const useLocation = (): Location => {
  const [status, setStatus] = useState<LocationStatus>('idle')
  const [geoPermission, setGeoPermission] = useState<GeoPermission>(null)
  const [localStorageReaded, setLocalStorageReaded] = useState<boolean>(false)

  const canRetrieve = localStorageReaded && geoPermission === 'granted'

  const {
    isSupported,
    coords,
    loading,
    error
  } = useGeolocation({ enabled: canRetrieve })

  let startTime: number
  let endTime: number

  useEffect(() => {
    const permission = getPermissionFromLocalStorage()
    if (permission) {
      setGeoPermission(permission)
    } else {
      setGeoPermission('prompt')
    }

    setLocalStorageReaded(true)
  }, [])

  const grantPermission = () => {
    savePermissionToLocalStorage('granted')
    setGeoPermission('granted')
  }

  useEffect(() => {
    if (error) {
      errorCallback(error)
    } else if (coords) {
      setStatus('success')
    }
  }, [loading, error])

  const errorCallback = useCallback((error: GeolocationPositionError) => {
    endTime = new Date().getTime()
    const elapsed = endTime - startTime
    let status: LocationStatus

    if (elapsed < DISABLED_TIMEOUT && error.code === error.PERMISSION_DENIED) {
      status = 'off'
      toast('Parece que tienes la geolocalización desactivada.')
    } else if (error.code === error.PERMISSION_DENIED) {
      status = 'denied'
      // toast('Has denegado el acceso a tu ubicación.')
    } else if (error.code === (error.TIMEOUT || error.POSITION_UNAVAILABLE)) {
      status = 'not_supported'
      toast('No se puede obtener tu ubicación.')
    } else {
      status = 'error'
      toast('Ha ocurrido un error al obtener tu ubicación.')
    }

    setStatus(status)
    setGeoPermission('denied')
  }, [error])

  return {
    isSupported,
    coords,
    geoPermission,
    grantPermission,
    status
  }
}

export default useLocation
