import type { Location } from '@types'
import { useEffect, useState } from 'react'
import { getForecast } from '@services/index'

const useForecast = (locationData: Location) => {
  const [data, setData] = useState<unknown>(null)
  const { status } = locationData

  useEffect(() => {
    if (status !== 'loading') {
      getForecast(locationData).then(d => {
        setData(d)
      })
    }
  }, [status])

  return data
}

export default useForecast
