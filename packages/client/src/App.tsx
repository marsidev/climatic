import type { FlexProps } from '@chakra-ui/react'
import type { ForecastResponse } from '@types'

import { FC } from 'react'
import GeoPermissionButton from '@components/GeoPermissionButton'
import MainWeather from '@components/MainWeather'
import Forecast from '@components/Forecast'
import Layout from '@components/Layout'
import useGeo from '@hooks/useGeo'
import useForecast from '@hooks/useForecast'

const App: FC<FlexProps> = () => {
  const geoData = useGeo()
  const forecastData = useForecast(geoData) as ForecastResponse

  if (!forecastData) return null

  return (
    <Layout>
      <GeoPermissionButton />
      <MainWeather data={forecastData} />
      <Forecast data={forecastData} mt={8} />
    </Layout>
  )
}

export default App
