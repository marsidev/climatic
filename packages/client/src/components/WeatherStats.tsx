import type { ForecastResponse } from '@climatic/shared'
import { StackProps } from '@chakra-ui/react'

import { FC } from 'react'
import { Flex, HStack } from '@chakra-ui/react'
import { formatSpeed, formatInt } from '@lib/intl'
import { DEFAULT_SPEED_UNIT, DEFAULT_PRESSURE_UNIT } from '@lib/constants'
import { WindDirectionIcon, StatCard } from '@components'

import { MdOutlineWaterDrop as DropIcon, MdCloudQueue as CloudIcon } from 'react-icons/md'
import { CgCompressV as PressureIcon } from 'react-icons/cg'

interface WeatherStatsProps extends StackProps {
  data: ForecastResponse
}

export const WeatherStats: FC<WeatherStatsProps> = ({ data, ...props }) => {
  const { currentWeather } = data
  const { humidity, cloud, wind, pressure } = currentWeather
  const { degree, speed } = wind

  const windSpeed = formatSpeed(speed[DEFAULT_SPEED_UNIT], DEFAULT_SPEED_UNIT)

  const pressureValue = formatInt(pressure[DEFAULT_PRESSURE_UNIT])
  const pressureStr = `${pressureValue} ${DEFAULT_PRESSURE_UNIT}`

  return (
    <Flex as='section' flexDir='column' px={4} {...props}>
      <HStack
        align='center'
        as='ul'
        justify='center'
      >
        <StatCard icon={<DropIcon />} value={`${humidity}%`} />
        <StatCard icon={<CloudIcon />} value={`${cloud}%`} />
        <StatCard icon={<WindDirectionIcon degree={degree} mr={1} />} value={windSpeed} />
        <StatCard icon={<PressureIcon />} value={pressureStr} />
      </HStack>
    </Flex>
  )
}
