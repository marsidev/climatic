/* eslint-disable no-undef */
import type { GeoPermission, GeoStatus, Location } from '@types'

import { useEffect, useState } from 'react'
import { getGeoPermission, saveGeoPermission } from '@lib/localStorage'
import { toast } from 'react-toastify'
import useGeolocation from '@hooks/_useGeolocation'

const DISABLED_TIMEOUT: number = 1000

const useLocation = (): Location => {
  const [status, setStatus] = useState<GeoStatus>('denied')
  const [geoPermission, setGeoPermission] = useState<GeoPermission>('prompt')

  const canRetrieve = geoPermission === 'granted'

  const {
    isSupported,
    coords,
    loading,
    error
  } = useGeolocation({ enabled: canRetrieve })

  let startTime: number
  let endTime: number

  useEffect(() => {
    const permission = getGeoPermission()
    setGeoPermission(permission)
  }, [])

  const grantPermission = () => {
    saveGeoPermission('granted')
    setGeoPermission('granted')
  }

  useEffect(() => {
    if (error) {
      errorCallback(error)
    } else if (coords) {
      setStatus('success')
    }
  }, [loading])

  function errorCallback(error: GeolocationPositionError): void {
    endTime = new Date().getTime()
    const elapsed = endTime - startTime
    let status: GeoStatus

    if (elapsed < DISABLED_TIMEOUT && error.code === error.PERMISSION_DENIED) {
      status = 'denied'
      toast('Parece que tienes la geolocalización desactivada.')
    } else if (error.code === error.PERMISSION_DENIED) {
      status = 'denied'
      toast('Has denegado el acceso a tu ubicación.')
    } else if (error.code === (error.TIMEOUT || error.POSITION_UNAVAILABLE)) {
      status = 'not_supported'
      toast('No se puede obtener tu ubicación.')
    } else {
      status = 'error'
      toast('Ha ocurrido un error al obtener tu ubicación.')
    }

    setStatus(status)
  }

  return {
    isSupported,
    coords,
    grantPermission,
    status
  }
}

export default useLocation
