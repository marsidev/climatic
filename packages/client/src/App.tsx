import type { FlexProps } from '@chakra-ui/react'
import type { ForecastResponse } from '@types'

import { FC } from 'react'
import { Flex } from '@chakra-ui/react'
import GeoPermissionButton from '@components/GeoPermissionButton'
import MainWeather from '@components/MainWeather'
import Forecast from '@components/Forecast'
import useGeo from '@hooks/useGeo'
import useForecast from '@hooks/useForecast'

const App: FC<FlexProps> = ({ ...props }) => {
  const geoData = useGeo()
  const forecastData = useForecast(geoData) as ForecastResponse

  if (!forecastData) return null

  return (
    <Flex
      as='main'
      bg='blue.300'
      color='white'
      display='flex'
      flexDir='column'
      justify='flex-start'
      minH='100vh'
      {...props}
    >
      <GeoPermissionButton />
      <MainWeather data={forecastData} />
      <Forecast data={forecastData} mt={8} />
    </Flex>
  )
}

export default App
