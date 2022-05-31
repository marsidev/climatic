import { useEffect, useState } from 'react'
import { getForecast } from '@services'
import { useStore } from '@store'

export const useForecast = () => {
  const [data, setData] = useState<unknown>(null)
  const { coords, locationStatus } = useStore()

  useEffect(() => {
    if (locationStatus !== 'loading') {
      getForecast({ coords, locationStatus }).then(d => {
        setData(d)
      })
    }
  }, [locationStatus])

  return data
}

export default useForecast
