import type { ForecastResponse } from '@climatic/shared'
import { StackProps, FlexProps } from '@chakra-ui/react'

import { FC, ReactNode } from 'react'
import { chakra, Box, Flex, HStack } from '@chakra-ui/react'
import { formatSpeed, formatInt } from '@lib/intl'
import { DEFAULT_SPEED_UNIT, DEFAULT_PRESSURE_UNIT } from '@lib/constants'
import { WindDirectionIcon } from '@components'

import { MdOutlineWaterDrop as DropIcon, MdCloudQueue as CloudIcon } from 'react-icons/md'
import { CgCompressV as PressureIcon } from 'react-icons/cg'

interface WeatherStatsProps extends StackProps {
  data: ForecastResponse
}

interface StatItemProps extends FlexProps {
  icon: ReactNode
  value: string
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
  minW: ['4.5em', '4.5em', '5em', '5em'],
  px: [1, 1, 2, 2],
  transition: 'all 150ms ease-in',
  fontSize: [16, 16, 18, 18]
}

const StatItem: FC<StatItemProps> = ({ icon, value, ...props }) => {
  return (
    <Flex {...statItemStyle} {...props}>
      <chakra.figure>{icon}</chakra.figure>
      <chakra.span ml={1}>{value}</chakra.span>
    </Flex>
  )
}

export const WeatherStats: FC<WeatherStatsProps> = ({ data, ...props }) => {
  const { currentWeather } = data
  const { humidity, cloud, wind, pressure } = currentWeather
  const { degree, speed } = wind

  const windSpeed = formatSpeed(speed[DEFAULT_SPEED_UNIT], DEFAULT_SPEED_UNIT)

  const pressureValue = formatInt(pressure[DEFAULT_PRESSURE_UNIT])
  const pressureStr = `${pressureValue} ${DEFAULT_PRESSURE_UNIT}`

  return (
    <Box as='section'>
      <HStack
        align='center'
        as='ul'
        justify='center'
        {...props}
      >
        <StatItem icon={<DropIcon />} value={`${humidity}%`} />
        <StatItem icon={<CloudIcon />} value={`${cloud}%`} />
        <StatItem icon={<WindDirectionIcon degree={degree} mr={1} />} value={windSpeed} />
        <StatItem icon={<PressureIcon />} value={pressureStr} />
      </HStack>
    </Box>
  )
}
