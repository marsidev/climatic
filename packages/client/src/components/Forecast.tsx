import type { ForecastResponse } from '@climatic/shared'
import type { FC } from 'react'

import { chakra, Flex, FlexProps, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react'
import { formatInt, getShortDate, formatTemperature } from '@lib/intl'
import { ASSETS_URL } from '@lib/config'
import { useStore } from '@store'
import { useTranslation } from 'react-i18next'

interface ForecastProps extends FlexProps {
  data: ForecastResponse
}

export const Forecast: FC<ForecastProps> = ({ data, ...props }) => {
  const { t } = useTranslation()
  const temperatureUnit = useStore(s => s.temperatureUnit)
  const { forecast } = data
  const forecastFromTomorrow = forecast.slice(1)

  return (
    <Flex
      align='center'
      as='section'
      flexDir='column'
      id='forecast-section'
      px={2}
      {...props}
    >
      <Heading as='h4' className='section-heading'>
        {t('forecast-title', { d: forecastFromTomorrow.length })}
      </Heading>

      <VStack as='ul' className='section-list' spacing={2}>
        {forecastFromTomorrow.map(data => {
          const { timestamp, day } = data
          const { condition: { icon: iconPath, name }, temperature } = day

          const date = getShortDate(timestamp)
          const minTemp = temperature[temperatureUnit].min
          const maxTemp = temperature[temperatureUnit].max
          const minTempStr = formatTemperature(minTemp, temperatureUnit)
          const maxTempStr = formatInt(maxTemp)

          const conditionName = name.toLowerCase()

          return (
            <HStack key={timestamp} as='li' className='section-list-item'>
              <Text as='span' minW='6.15em'>{date}</Text>

              <Text fontWeight={800}>
                <chakra.span color='red.600'>{maxTempStr}</chakra.span>
                <chakra.span> / </chakra.span>
                <chakra.span color='blue.600'>{minTempStr}</chakra.span>
              </Text>

              <Flex as='figure' justify='center'>
                <Image
                  alt={`icono de clima ${conditionName}`}
                  h={8}
                  src={`${ASSETS_URL}/icons${iconPath}`}
                  w={8}
                />
              </Flex>

              <Text as='span' fontSize='xs' textAlign='right' w='100px'>
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
