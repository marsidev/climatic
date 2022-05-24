import type { ForecastResponse } from '@types'

import { FC } from 'react'
import { Flex, FlexProps, Heading } from '@chakra-ui/react'
import { formatTemperature } from '@lib/intl'

interface MainWeatherProps extends FlexProps {
  data: ForecastResponse
}

const MainWeather: FC<MainWeatherProps> = ({ data, ...props }) => {
  const { location, currentWeather } = data
  const { condition } = currentWeather

  const unit = 'celsius'
  const temperature = currentWeather.temperature[unit]
  const temperatureStr = formatTemperature(temperature, unit)

  return (
    <Flex
      align='center'
      // border='1px solid'
      flexDir='column'
      mt={4}
      {...props}
    >
      <Heading as='h2' fontSize={48} fontWeight={400}>
        {location.name}
      </Heading>
      <Heading as='h3' fontSize={24} fontWeight={400} lineHeight={1}>
        {condition.name}
      </Heading>
      <Heading as='h3' fontSize={96} fontWeight={400} lineHeight={1}>
        {temperatureStr}
      </Heading>
    </Flex>
  )
}

export default MainWeather
