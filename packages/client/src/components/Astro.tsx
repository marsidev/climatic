import type { ForecastResponse } from '@climatic/shared'
import type { StackProps, FlexProps } from '@chakra-ui/react'

import { FC, ReactNode } from 'react'
import { chakra, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { MoonPhaseIcon } from '@components'
import { MOON_PHASES_ES } from '@lib/constants'
import { WiMoonset, WiMoonrise, WiSunset, WiSunrise } from 'react-icons/wi'

interface AstroProps extends StackProps {
  data: ForecastResponse
}

interface LabelIconProps extends FlexProps {
  label: string
  icon: ReactNode
}

const LabelIcon: FC<LabelIconProps> = ({ label, icon }) => {
  return (
    <Flex align='center'>
      <Text as='span' minW='80px'>{label}</Text>

      <chakra.figure display='inline-block' fontSize={20}>
        {icon}
      </chakra.figure>
    </Flex>
  )
}

export const Astro: FC<AstroProps> = ({ data, ...props }) => {
  const { forecast } = data
  const todayForecast = forecast[0]
  const { astro } = todayForecast
  const { moon_phase, moonrise, moonset, sunrise, sunset } = astro

  return (
    <Flex align='center' as='section' flexDir='column' px={2} {...props}>
      <Heading as='h4' className='section-heading'>
        Astrología
      </Heading>

      <VStack as='ul' className='section-list' spacing={2}>
        <HStack as='li' className='section-list-item'>
          <LabelIcon icon={<WiSunrise />} label='Salida del sol' />
          <Text as='span'>{sunrise}</Text>
        </HStack>

        <HStack as='li' className='section-list-item'>
          <LabelIcon icon={<WiSunset />} label='Puesta del sol' />
          <Text as='span'>{sunset}</Text>
        </HStack>

        <HStack as='li' className='section-list-item'>
          <LabelIcon icon={<WiMoonrise />} label='Salida de la luna' />
          <Text as='span'>{moonrise}</Text>
        </HStack>

        <HStack as='li' className='section-list-item'>
          <LabelIcon icon={<WiMoonset />} label='Puesta de la luna' />
          <Text as='span'>{moonset}</Text>
        </HStack>

        <HStack as='li' className='section-list-item'>
          <Text as='span' minW='80px'>Fase de la luna</Text>

          <LabelIcon icon={<MoonPhaseIcon phase={moon_phase} />} label={MOON_PHASES_ES[moon_phase]} />
        </HStack>
      </VStack>
    </Flex>
  )
}
