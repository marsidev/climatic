import type { ForecastResponse } from '@types'

import { FC } from 'react'
import { Flex, FlexProps, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { formatNumber, getDayName } from '@lib/intl'

interface ForecastProps extends FlexProps {
  data: ForecastResponse
}

const Forecast: FC<ForecastProps> = ({ data, ...props }) => {
  const { forecast } = data
  const forecastFromTomorrow = forecast.slice(1)

  return (
    <Flex
      align='center'
      border='1px solid'
      flexDir='column'
      minH={400}
      px={2}
      {...props}
    >
      <VStack w='100%'>
        {forecastFromTomorrow.map(data => {
          const { timestamp, day } = data
          const { condition: { icon, name }, temperature } = day

          const dayName = getDayName(timestamp)
          const unit = 'celsius'
          const minTemp = temperature[unit].min
          const maxTemp = temperature[unit].max
          const minTempStr = formatNumber(minTemp)
          const maxTempStr = formatNumber(maxTemp)

          return (
            <HStack key={timestamp} justify='space-between' w='100%'>
              <Text minW='33.33%'>{dayName}</Text>

              <Flex as='figure' justify='center' minW='33.33%'>
                <Image
                  alt={`${name} icon`}
                  h={8}
                  src={`https://cdn.weatherapi.com/weather/64x64${icon}`}
                  w={8}
                />
              </Flex>

              <HStack justify='flex-end' minW='33.33%' pr={4}>
                <Text>{maxTempStr}</Text>
                <Text>{minTempStr}</Text>
              </HStack>
            </HStack>
          )
        })}
      </VStack>
    </Flex>
  )
}

export default Forecast
