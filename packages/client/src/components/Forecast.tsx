import type { ForecastResponse } from '@climatic/shared'

import { FC } from 'react'
import { chakra, Flex, FlexProps, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { formatInt, getShortDate, formatTemperature } from '@lib/intl'
import { DEFAULT_TEMPERATURE_UNIT, ASSETS_URL } from '@lib/constants'

interface ForecastProps extends FlexProps {
  data: ForecastResponse
}

export const Forecast: FC<ForecastProps> = ({ data, ...props }) => {
  const { forecast } = data
  const forecastFromTomorrow = forecast.slice(1)

  return (
    <Flex
      align='center'
      as='section'
      flexDir='column'
      px={2}
      {...props}
    >
      <Heading as='h4' className='section-heading'>
        Predicción de los próximos 7 días
      </Heading>

      <VStack as='ul' className='section-list' spacing={2}>
        {forecastFromTomorrow.map(data => {
          const { timestamp, day } = data
          const { condition: { icon, name }, temperature } = day

          const date = getShortDate(timestamp)
          const minTemp = temperature[DEFAULT_TEMPERATURE_UNIT].min
          const maxTemp = temperature[DEFAULT_TEMPERATURE_UNIT].max
          const minTempStr = formatTemperature(minTemp, DEFAULT_TEMPERATURE_UNIT)
          const maxTempStr = formatInt(maxTemp)

          const conditionName = name.toLowerCase()

          return (
            <HStack key={timestamp} as='li' className='section-list-item'>
              <Text as='span' minW='80px'>{date}</Text>

              <Flex as='figure' justify='center'>
                <Image
                  alt={`icono de clima ${conditionName}`}
                  h={8}
                  src={`${ASSETS_URL}/icons/${icon}`}
                  w={8}
                />
              </Flex>

              <Text fontWeight={800}>
                <chakra.span color='red.600'>{maxTempStr}</chakra.span>
                <chakra.span> / </chakra.span>
                <chakra.span color='blue.600'>{minTempStr}</chakra.span>
              </Text>

              <Text as='span' fontSize={12} w='100px'>
                {conditionName}
              </Text>
            </HStack>
          )
        })}
      </VStack>
    </Flex>
  )
}

export default Forecast
