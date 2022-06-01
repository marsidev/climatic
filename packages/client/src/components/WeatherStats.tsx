import type { ForecastResponse } from '@climatic/shared'
import { StackProps, FlexProps } from '@chakra-ui/react'

import { FC } from 'react'
import { chakra, Box, Flex, HStack } from '@chakra-ui/react'
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

const statItemStyle: FlexProps = {
  as: 'li',
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
    <Box as='section'>
      <HStack
        align='center'
        as='ul'
        justify='center'
        {...props}
      >
        <Flex {...statItemStyle}>
          <chakra.figure><DropIcon /></chakra.figure>
          <chakra.span ml={1}>{humidity}%</chakra.span>
        </Flex>

        <Flex {...statItemStyle}>
          <chakra.figure><CloudIcon /></chakra.figure>
          <chakra.span ml={1}>{cloud}%</chakra.span>
        </Flex>

        <Flex {...statItemStyle}>
          <chakra.figure><WindIcon /></chakra.figure>
          <chakra.span ml={1}>{windSpeed}</chakra.span>
          <WindDirectionIcon degree={degree} ml={1} />
        </Flex>
      </HStack>
    </Box>
  )
}
