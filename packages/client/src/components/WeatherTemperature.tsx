import type { ForecastResponse } from '@climatic/shared'
import { FlexProps } from '@chakra-ui/react'
import type { FC } from 'react'

import { chakra, Flex, Heading } from '@chakra-ui/react'
import { formatTemperature } from '@lib/intl'
import { useStore } from '@store'

interface TemperatureProps extends FlexProps {
  data: ForecastResponse
}

export const WeatherTemperature: FC<TemperatureProps> = ({ data, ...props }) => {
  const temperatureUnit = useStore(s => s.temperatureUnit)
  const { currentWeather } = data
  const { temperature, feelsLike } = currentWeather

  const _temperature = temperature[temperatureUnit]
  const temperatureStr = formatTemperature(_temperature, temperatureUnit)

  const feelTemperature = feelsLike[temperatureUnit]
  const feelTemperatureStr = formatTemperature(feelTemperature, temperatureUnit)

  const showFeelsLikeTemperature = temperatureStr !== feelTemperatureStr

  return (
    <Flex align='center' as='section' flexDir='column' {...props}>
      <Heading
        as='h3'
        fontFamily='Aileron, san-serif'
        fontSize='8xl'
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
          fontSize='lg'
          fontWeight={400}
          id='feels-like'
        >
          Sensación térmica de {feelTemperatureStr}
        </chakra.span>
      )}
    </Flex>
  )
}
