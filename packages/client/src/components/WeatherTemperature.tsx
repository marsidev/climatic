import type { ForecastResponse } from '@climatic/shared'
import { FlexProps } from '@chakra-ui/react'
import type { FC } from 'react'

import { chakra, Flex, Heading } from '@chakra-ui/react'
import { formatTemperature } from '@lib/intl'
import { DEFAULT_TEMPERATURE_UNIT } from '@lib/config'

interface TemperatureProps extends FlexProps {
  data: ForecastResponse
}

export const WeatherTemperature: FC<TemperatureProps> = ({ data, ...props }) => {
  const { currentWeather } = data
  const { temperature, feelsLike } = currentWeather

  const _temperature = temperature[DEFAULT_TEMPERATURE_UNIT]
  const temperatureStr = formatTemperature(_temperature, DEFAULT_TEMPERATURE_UNIT)

  const feelTemperature = feelsLike[DEFAULT_TEMPERATURE_UNIT]
  const feelTemperatureStr = formatTemperature(feelTemperature, DEFAULT_TEMPERATURE_UNIT)

  const showFeelsLikeTemperature = temperatureStr !== feelTemperatureStr

  return (
    <Flex align='center' as='section' flexDir='column' {...props}>
      <Heading
        as='h3'
        fontFamily='Aileron, san-serif'
        fontSize={96}
        fontWeight={300}
        id='temperature'
        lineHeight={1}
        py={0}
      >
        {temperatureStr}
      </Heading>

      {showFeelsLikeTemperature && (
        <chakra.span
          fontFamily='RubikVariable, san-serif'
          fontWeight={400}
          id='feels-like'
        >
          Sensación térmica de {feelTemperatureStr}
        </chakra.span>
      )}
    </Flex>
  )
}
