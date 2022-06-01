import type { ForecastResponse } from '@climatic/shared'

import { FC } from 'react'
import { Flex, FlexProps, Heading, Image, Text } from '@chakra-ui/react'
import { getLargeDate, formatTemperature } from '@lib/intl'
import { DEFAULT_TEMPERATURE_UNIT } from '@lib/constants'
import { flag } from 'country-emoji'

interface WeatherProps extends FlexProps {
  data: ForecastResponse
}

export const Weather: FC<WeatherProps> = ({ data, ...props }) => {
  const { location, currentWeather } = data
  const { condition: { icon: conditionIcon, name: conditionName }, temperature, updateAt } = currentWeather
  const { country, name: city } = location

  const date = getLargeDate(updateAt)
  const _temperature = temperature[DEFAULT_TEMPERATURE_UNIT]
  const temperatureStr = formatTemperature(_temperature, DEFAULT_TEMPERATURE_UNIT)

  return (
    <>
      <Flex
        align='center'
        as='header'
        flexDir='column'
        {...props}
      >
        <Heading
          as='h2'
          fontSize={48}
          fontWeight={300}
        >
          {`${city}, ${flag(country)}`}
        </Heading>

        <Heading
          as='h3'
          fontSize={24}
          fontWeight={400}
        >
          {date}
        </Heading>

        <Flex
          align='center'
          as='h3'
          fontSize={24}
          fontWeight={400}
          justify='center'
        >
          <Text as='span' h='100%'>{conditionName}</Text>

          <Image
            alt={`icono de clima ${conditionName}`}
            display='inline-block'
            h={8}
            src={`/src/assets/icons/${conditionIcon}`}
            w={8}
          />
        </Flex>
      </Flex>

      <Flex
        align='center'
        as='section'
        flexDir='column'
      >
        <Heading as='h3' fontFamily='Aileron, san-serif' fontSize={96} fontWeight={300} lineHeight={1.5}>
          {temperatureStr}
        </Heading>
      </Flex>
    </>
  )
}

export default Weather
