import type { Geo } from '@types'
import { useEffect, useState } from 'react'
import { getForecast } from '@services/index'

const useForecast = (geoData: Geo) => {
  const [data, setData] = useState<unknown>(null)
  const { status } = geoData

  useEffect(() => {
    if (status !== 'loading') {
      getForecast(geoData).then(d => {
        setData(d)
      })
    }
  }, [status])

  return data
}

export default useForecast
