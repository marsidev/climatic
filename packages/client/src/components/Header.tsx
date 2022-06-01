import type { ForecastResponse } from '@climatic/shared'
import { FlexProps } from '@chakra-ui/react'

import { FC } from 'react'
import { Flex, Heading, Image, Text } from '@chakra-ui/react'
import { getLargeDate } from '@lib/intl'
import { ASSETS_URL } from '@lib/constants'
import { flag } from 'country-emoji'

interface HeaderProps extends FlexProps {
  data: ForecastResponse
}

export const Header: FC<HeaderProps> = ({ data, ...props }) => {
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
        fontSize={48}
        fontWeight={300}
        lineHeight={1}
        textAlign='center'
      >
        {`${city}, ${flag(country)}`}
      </Heading>

      <Heading
        as='h3'
        fontSize={24}
        fontWeight={400}
        mt={1}
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
