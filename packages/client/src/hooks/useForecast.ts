// import type { ForecastResponse } from '@types'

import { useEffect, useState } from 'react'
import { getForecast } from '@services/index'

const useForecast = () => {
  const [data, setData] = useState<unknown>(null)

  const fetchData = () => {
    getForecast().then(d => {
      setData(d)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return data
}

export default useForecast
