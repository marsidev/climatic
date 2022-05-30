import type { FlexProps } from '@chakra-ui/react'
import type { ForecastResponse } from '@climatic/shared'

import { FC } from 'react'
import { GeoPermissionButton, Forecast, Layout, LoadingLayout, Weather } from '@components'
import { useLocation, useForecast } from '@hooks'

export const App: FC<FlexProps> = () => {
  const locationData = useLocation()
  const forecastData = useForecast(locationData) as ForecastResponse

  if (!forecastData) return <LoadingLayout />

  return (
    <Layout>
      <GeoPermissionButton pt={2} />
      <Weather data={forecastData} />
      <Forecast data={forecastData} mt={8} />
    </Layout>
  )
}

export default App
