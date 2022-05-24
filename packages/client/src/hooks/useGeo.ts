import type { GeoPermission, GeoStatus, GeoPosition, Geo } from '@types'
import { useEffect, useState } from 'react'
import { getGeoPermission, saveGeoPermission } from '@lib/localStorage'
import { DEFAULT_LOCATION } from '@lib/constants'

const round = (num: number) => {
  return Math.round(num * 100) / 100
}

const catchFunction = (error: any) => {
  if (error.code === error.PERMISSION_DENIED) {
    console.log('geolocalization permission denied')
    return 'denied'
  }

  console.log('error while geolocating')
  return 'error'
}

const useGeo = (): Geo => {
  const [geoPermission, setGeoPermission] = useState<GeoPermission>('prompt')
  const [lat, setLat] = useState<GeoPosition>(DEFAULT_LOCATION.latitude)
  const [lon, setLon] = useState<GeoPosition>(DEFAULT_LOCATION.longitude)
  const [status, setStatus] = useState<GeoStatus>('loading')

  useEffect(() => {
    const permission = getGeoPermission()
    setGeoPermission(permission)
  }, [])

  useEffect(() => {
    // add a better validator, such as checking if the forecast data exists and has the same coordinates
    if (geoPermission === 'granted') {
      getLocation()
    }
  }, [geoPermission])

  const grantPermission = () => {
    saveGeoPermission('granted')
    setGeoPermission('granted')
  }

  function getLocation() {
    if (!navigator.geolocation) {
      setStatus('not_supported')
    } else {
      setStatus('loading')

      navigator.geolocation.getCurrentPosition(position => {
        const { coords: { latitude, longitude } } = position
        setLat(round(latitude))
        setLon(round(longitude))
        setStatus('success')
      }, error => {
        setStatus(catchFunction(error))
      })
    }
  }

  return {
    latitude: lat,
    longitude: lon,
    status,
    grantPermission
  }
}

export default useGeo
