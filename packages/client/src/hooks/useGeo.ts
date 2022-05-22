import type { GeoPermission, GeoStatus, GeoPosition } from '@types'
import { useEffect, useState } from 'react'
import { getGeoPermission, saveGeoPermission } from '@lib/localStorage'

interface UseGeoReturn {
  latitude: GeoPosition
  longitude: GeoPosition
  geoStatus: GeoStatus
  grantPermission: () => void
}

const useGeo = (): UseGeoReturn => {
  const [geoPermission, setGeoPermission] = useState<GeoPermission>('prompt')
  const [lat, setLat] = useState<GeoPosition>(null)
  const [lon, setLon] = useState<GeoPosition>(null)
  const [geoStatus, setGeoStatus] = useState<GeoStatus>(null)

  useEffect(() => {
    const permission = getGeoPermission()
    setGeoPermission(permission)
  }, [])

  useEffect(() => {
    if (geoPermission === 'granted' && !lat && !lon) {
      getLocation()
    }
  }, [geoPermission])

  const grantPermission = () => {
    saveGeoPermission('granted')
    setGeoPermission('granted')
  }

  function getLocation() {
    if (!navigator.geolocation) {
      setGeoStatus('not_supported')
    } else {
      setGeoStatus('loading')
      navigator.geolocation.getCurrentPosition(position => {
        setGeoStatus('success')
        setLat(position.coords.latitude)
        setLon(position.coords.longitude)
      }, () => {
        setGeoStatus('error')
      })
    }
  }

  return {
    latitude: lat,
    longitude: lon,
    geoStatus,
    grantPermission
  }
}

export default useGeo
