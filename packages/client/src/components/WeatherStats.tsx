import type { ForecastResponse } from '@climatic/shared'
import { StackProps } from '@chakra-ui/react'

import { FC } from 'react'
import { chakra, Flex, HStack } from '@chakra-ui/react'
import { formatSpeed } from '@lib/intl'
import { DEFAULT_SPEED_UNIT } from '@lib/constants'
import { WindDirectionIcon } from '@components'

import {
  MdOutlineWaterDrop as DropIcon,
  MdCloudQueue as CloudIcon
} from 'react-icons/md'
import { FiWind as WindIcon } from 'react-icons/fi'

interface WeatherStatsProps extends StackProps {
  data: ForecastResponse
}

const WeatherStatStyle = {
  align: 'center',
  border: '1px solid',
  borderColor: 'blackAlpha.700',
  borderRadius: 8,
  fontFamily: 'NunitoVariable, san-serif',
  justify: 'center',
  minH: '50px',
  minW: 20,
  px: 2
}

export const WeatherStats: FC<WeatherStatsProps> = ({ data, ...props }) => {
  const { currentWeather } = data
  const { humidity, cloud, wind } = currentWeather
  const { degree, speed } = wind
  const windSpeed = formatSpeed(speed[DEFAULT_SPEED_UNIT], DEFAULT_SPEED_UNIT)

  return (
    <HStack
      align='center'
      as='section'
      borderRadius={8}
      {...props}
    >
      <Flex {...WeatherStatStyle}>
        <chakra.span><DropIcon /></chakra.span>
        <chakra.span ml={1}>{humidity}%</chakra.span>
      </Flex>

      <Flex {...WeatherStatStyle}>
        <chakra.span><CloudIcon /></chakra.span>
        <chakra.span ml={1}>{cloud}%</chakra.span>
      </Flex>

      <Flex {...WeatherStatStyle}>
        <chakra.span><WindIcon /></chakra.span>
        <chakra.span ml={1}>{windSpeed}</chakra.span>
        <chakra.span ml={1}>
          <WindDirectionIcon degree={degree} />
        </chakra.span>
      </Flex>
    </HStack>
  )
}
