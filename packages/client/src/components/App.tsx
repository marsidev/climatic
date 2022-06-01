import { FlexProps } from '@chakra-ui/react'
import type { ForecastResponse } from '@climatic/shared'

import { FC } from 'react'
import { Layout, LoadingLayout } from '@components'
import { useForecast, useGeo } from '@hooks'

export const App: FC<FlexProps> = () => {
  useGeo()
  const forecastData = useForecast() as ForecastResponse

  if (!forecastData) return <LoadingLayout />

  return <Layout data={forecastData} />
}

export default App
