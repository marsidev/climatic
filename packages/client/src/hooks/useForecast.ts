import { useEffect, useState } from 'react'
import { getForecast } from '@services/index'

const useForecast = () => {
  const [data, setData] = useState<unknown>(null)

  useEffect(() => {
    getForecast().then(d => {
      setData(d)
    })
  }, [])

  return data
}

export default useForecast
