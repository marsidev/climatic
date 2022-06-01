import type { ForecastResponse } from '@climatic/shared'
import { FlexProps, Icon, StackProps } from '@chakra-ui/react'

import { FC } from 'react'
import { chakra, Flex, Heading, HStack, Image, Text } from '@chakra-ui/react'
import { getLargeDate, formatTemperature, formatSpeed } from '@lib/intl'
import { DEFAULT_TEMPERATURE_UNIT, DEFAULT_SPEED_UNIT, ASSETS_URL } from '@lib/constants'
import { flag } from 'country-emoji'

import {
  MdOutlineWaterDrop as DropIcon,
  MdCloudQueue as CloudIcon
} from 'react-icons/md'
import { FiWind as WindIcon } from 'react-icons/fi'
import { TiLocationArrowOutline as ArrowIcon } from 'react-icons/ti'

interface WeatherProps extends FlexProps {
  data: ForecastResponse
}

interface WeatherStatsProps extends StackProps {
  data: ForecastResponse
}

interface WindDirectionProps {
  degree: number
}

const WindDirection: FC<WindDirectionProps> = ({ degree }) => {
  const transform = `rotate(${-45 + degree}deg)`

  return (
    <Flex as='span'>
      <Icon as={ArrowIcon} transform={transform} />
    </Flex>
  )
}

const Header: FC<WeatherProps> = ({ data, ...props }) => {
  const { location, currentWeather } = data
  const { condition: { icon: conditionIcon, name: conditionName }, updateAt } = currentWeather
  const { country, name: city } = location

  const date = getLargeDate(updateAt)
  return (
    <Flex
      align='center'
      as='header'
      flexDir='column'
      {...props}
    >
      <Heading
        as='h2'
        // border='2px solid purple'
        fontSize={48}
        fontWeight={300}
        textAlign='center'
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
          src={`${ASSETS_URL}/icons/${conditionIcon}`}
          w={8}
        />
      </Flex>
    </Flex>
  )
}

const Temperature: FC<WeatherProps> = ({ data, ...props }) => {
  const { currentWeather } = data
  const { temperature } = currentWeather

  const _temperature = temperature[DEFAULT_TEMPERATURE_UNIT]
  const temperatureStr = formatTemperature(_temperature, DEFAULT_TEMPERATURE_UNIT)

  return (
    <Flex
      align='center'
      as='section'
      flexDir='column'
      {...props}
    >
      <Heading
        as='h3'
        fontFamily='Aileron, san-serif'
        fontSize={96}
        fontWeight={300}
        lineHeight={1.5}
      >
        {temperatureStr}
      </Heading>
    </Flex>
  )
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

const WeatherStats: FC<WeatherStatsProps> = ({ data, ...props }) => {
  const { currentWeather } = data
  const { humidity, cloud, wind } = currentWeather
  const { degree, speed } = wind
  const windSpeed = formatSpeed(speed[DEFAULT_SPEED_UNIT], DEFAULT_SPEED_UNIT)

  return (
    <HStack
      align='center'
      as='section'
      // border='2px solid blue'
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
          <WindDirection degree={degree} />
        </chakra.span>
      </Flex>
    </HStack>
  )
}

export const Weather: FC<WeatherProps> = ({ data }) => {
  return (
    <>
      <Header data={data} />
      <Temperature data={data} />
      <WeatherStats data={data} />
    </>
  )
}

export default Weather
