import type { FlexProps } from '@chakra-ui/react'
import type { ForecastResponse } from '@climatic/shared'

import { FC } from 'react'
import GeoPermissionButton from '@components/GeoPermissionButton'
import MainWeather from '@components/MainWeather'
import Forecast from '@components/Forecast'
import Layout from '@components/Layout'
import LoadingApp from '@components/LoadingApp'
import useLocation from '@hooks/useLocation'
import useForecast from '@hooks/useForecast'

const App: FC<FlexProps> = () => {
  const locationData = useLocation()
  const forecastData = useForecast(locationData) as ForecastResponse

  if (!forecastData) return <LoadingApp />

  return (
    <Layout>
      <GeoPermissionButton pt={2} />
      <MainWeather data={forecastData} />
      <Forecast data={forecastData} mt={8} />
    </Layout>
  )
}

export default App
