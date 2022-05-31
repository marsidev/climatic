import type { FlexProps } from '@chakra-ui/react'
import type { ForecastResponse } from '@climatic/shared'

import { FC } from 'react'
import { GeoPermissionButton, Forecast, Layout, LoadingLayout, Weather } from '@components'
import { useForecast, useGeo } from '@hooks'

export const App: FC<FlexProps> = () => {
  useGeo()
  const forecastData = useForecast() as ForecastResponse

  if (!forecastData) return <LoadingLayout />

  return (
    <Layout>
      <GeoPermissionButton />
      <Weather data={forecastData} />
      <Forecast data={forecastData} mt={8} />
    </Layout>
  )
}

export default App
