import type { FlexProps } from '@chakra-ui/react'
import type { ForecastResponse } from '@types'

import { useEffect, FC } from 'react'
import { Flex } from '@chakra-ui/react'
import GeoPermissionButton from '@components/GeoPermissionButton'
import MainWeather from '@components/MainWeather'
import useGeo from '@hooks/useGeo'
import useForecast from '@hooks/useForecast'

const App: FC<FlexProps> = ({ ...props }) => {
  const { latitude, longitude } = useGeo()
  const forecastData = useForecast() as ForecastResponse

  useEffect(() => {
    console.log({ latitude, longitude })
  }, [latitude])

  useEffect(() => {
    console.log(forecastData)
  }, [forecastData])

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
      <MainWeather />

    </Flex>
  )
}

export default App
