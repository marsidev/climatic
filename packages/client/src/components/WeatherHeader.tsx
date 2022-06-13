import type { ForecastResponse } from '@climatic/shared'
import { FlexProps } from '@chakra-ui/react'
import type { FC } from 'react'

import { chakra, Flex, Heading, Image, Text } from '@chakra-ui/react'
import { getLargeDate } from '@lib/intl'
import { ASSETS_URL } from '@lib/config'
import { flag } from 'country-emoji'
import { Time } from '@components'

interface HeaderProps extends FlexProps {
  data: ForecastResponse
}

export const WeatherHeader: FC<HeaderProps> = ({ data, ...props }) => {
  const { location, currentWeather } = data
  const {
    condition: { icon: conditionIconPath, name: conditionName },
    updateAt
  } = currentWeather
  const { country, name: city } = location

  const date = getLargeDate(updateAt)
  const emojiFlag = flag(country)

  return (
    <Flex align='center' as='header' flexDir='column' {...props}>
      <Heading
        as='h2'
        fontSize={48}
        fontWeight={300}
        lineHeight={1}
        textAlign='center'
      >
        {city}
        {emojiFlag && (
          <>
            <span>, </span>
            <chakra.span className='emoji-font' fontSize={40}>
              {emojiFlag}
            </chakra.span>
          </>
        )}
      </Heading>

      <Heading as='h3' fontSize={24} fontWeight={400} mt={1}>
        {date}
        {' - '}
        <Time />
      </Heading>

      <Flex
        align='center'
        as='h3'
        fontSize={24}
        fontWeight={400}
        justify='center'
      >
        <Text as='span' h='100%'>
          {conditionName}
        </Text>

        <Image
          alt={`icono de clima ${conditionName}`}
          display='inline-block'
          h={8}
          src={`${ASSETS_URL}/icons${conditionIconPath}`}
          w={8}
        />
      </Flex>
    </Flex>
  )
}
