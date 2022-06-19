import type { FC } from 'react'
import type { ForecastResponse } from '@climatic/shared'
import type { StackProps } from '@chakra-ui/react'

import { Flex, HStack } from '@chakra-ui/react'
import { formatSpeed, formatPressure } from '@lib/intl'
import { StatCard } from './StatCard'
import { WindDirectionIcon } from '@components'
import { useStore } from '@store'

import {
  MdOutlineWaterDrop as DropIcon,
  MdCloudQueue as CloudIcon
} from 'react-icons/md'
import { CgCompressV as PressureIcon } from 'react-icons/cg'

interface WeatherStatsProps extends StackProps {
  data: ForecastResponse
}

export const WeatherStats: FC<WeatherStatsProps> = ({ data, ...props }) => {
  const speedUnit = useStore(s => s.speedUnit)
  const pressureUnit = useStore(s => s.pressureUnit)
  const { currentWeather } = data
  const { humidity, cloud, wind, pressure } = currentWeather
  const { degree, speed } = wind

  const windSpeed = formatSpeed(speed[speedUnit], speedUnit)
  const pressureValue = formatPressure(pressure[pressureUnit], pressureUnit)

  return (
    <Flex as='section' flexDir='column' px={4} {...props}>
      <HStack align='center' as='ul' id='weather-data-stack' justify='center'>
        <StatCard
          ariaLabel='Humedad'
          icon={<DropIcon />}
          tooltipId='humidity-data'
          value={`${humidity}%`}
        />

        <StatCard
          ariaLabel='Nubosidad'
          icon={<CloudIcon />}
          tooltipId='cloud-data'
          value={`${cloud}%`}
        />

        <StatCard
          ariaLabel='Dirección y velocidad del viento'
          icon={<WindDirectionIcon degree={degree} mr={1} />}
          tooltipId='wind-data'
          value={windSpeed}
        />

        <StatCard
          ariaLabel='Presión'
          icon={<PressureIcon />}
          tooltipId='pressure-data'
          value={pressureValue}
        />
      </HStack>
    </Flex>
  )
}
