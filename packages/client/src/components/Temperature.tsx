import type { ForecastResponse } from '@climatic/shared'
import { FlexProps } from '@chakra-ui/react'

import { FC } from 'react'
import { chakra, Flex, Heading } from '@chakra-ui/react'
import { formatTemperature } from '@lib/intl'
import { DEFAULT_TEMPERATURE_UNIT } from '@lib/constants'

interface TemperatureProps extends FlexProps {
  data: ForecastResponse
}

export const Temperature: FC<TemperatureProps> = ({ data, ...props }) => {
  const { currentWeather } = data
  const { temperature, feelsLike } = currentWeather

  const _temperature = temperature[DEFAULT_TEMPERATURE_UNIT]
  const temperatureStr = formatTemperature(_temperature, DEFAULT_TEMPERATURE_UNIT)

  const feelTemperature = feelsLike[DEFAULT_TEMPERATURE_UNIT]
  const feelTemperatureStr = formatTemperature(feelTemperature, DEFAULT_TEMPERATURE_UNIT)

  return (
    <Flex
      align='center'
      as='section'
      flexDir='column'
      {...props}
    >
      <Heading
        as='h3'
        fontFamily='Aileron, san-serif'
        fontSize={96}
        fontWeight={300}
        lineHeight={1}
        py={0}
      >
        {temperatureStr}
      </Heading>

      <chakra.span
        fontFamily='NunitoVariable, san-serif'
        fontWeight={600}
      >
        Sensación de {feelTemperatureStr}
      </chakra.span>
    </Flex>
  )
}