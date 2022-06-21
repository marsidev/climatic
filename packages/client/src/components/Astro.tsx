import type { FC, ReactNode } from 'react'
import type { ForecastResponse, Astro as AstroType } from '@climatic/shared'
import type { StackProps, FlexProps } from '@chakra-ui/react'

import { chakra, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { MoonPhaseIcon } from '@components'
import { WiMoonset, WiMoonrise, WiSunset, WiSunrise } from 'react-icons/wi'
import { useTranslation } from 'react-i18next'

interface AstroProps extends StackProps {
  data: ForecastResponse
}

interface LabelIconProps extends FlexProps {
  label: string
  icon: ReactNode
}

const resolveAstro = (data: AstroType, lang: string) => {
  let { moonrise, moonset, sunrise, sunset } = data

  if (moonrise === 'No moonrise' && lang === 'es') moonrise = 'Sin datos'
  if (moonset === 'No moonset' && lang === 'es') moonset = 'Sin datos'
  if (sunrise === 'No sunrise' && lang === 'es') sunrise = 'Sin datos'
  if (sunset === 'No sunset' && lang === 'es') sunset = 'Sin datos'

  return { ...data, moonrise, moonset, sunrise, sunset }
}

const LabelIcon: FC<LabelIconProps> = ({ label, icon }) => {
  return (
    <Flex align='center'>
      <Text as='span' minW='80px'>{label}</Text>

      <chakra.figure display='inline-block' fontSize='md'>
        {icon}
      </chakra.figure>
    </Flex>
  )
}

export const Astro: FC<AstroProps> = ({ data, ...props }) => {
  const { t, i18n } = useTranslation()
  const { language: lang } = i18n

  const { forecast } = data
  const todayForecast = forecast[0]

  const astro = resolveAstro(todayForecast.astro, lang)
  const { moonrise, moonset, sunrise, sunset, moon_phase } = astro

  return (
    <Flex
      align='center'
      as='section'
      flexDir='column'
      id='astro-section'
      px={2}
      {...props}
    >
      <Heading as='h4' className='section-heading'>
        {t('astro.title')}
      </Heading>

      <VStack as='ul' className='section-list' spacing={4}>
        <HStack as='li' className='section-list-item'>
          <LabelIcon icon={<WiSunrise />} label={t('astro.sunrise')} />
          <Text as='span'>{sunrise}</Text>
        </HStack>

        <HStack as='li' className='section-list-item'>
          <LabelIcon icon={<WiSunset />} label={t('astro.sunset')} />
          <Text as='span'>{sunset}</Text>
        </HStack>

        <HStack as='li' className='section-list-item'>
          <LabelIcon icon={<WiMoonrise />} label={t('astro.moonrise')} />
          <Text as='span'>{moonrise}</Text>
        </HStack>

        <HStack as='li' className='section-list-item'>
          <LabelIcon icon={<WiMoonset />} label={t('astro.moonset')} />
          <Text as='span'>{moonset}</Text>
        </HStack>

        <HStack as='li' className='section-list-item'>
          <Text as='span' minW='80px'>
            {t('astro.moon-phase')}
          </Text>

          <LabelIcon
            icon={<MoonPhaseIcon phase={moon_phase} />}
            label={t(`astro.moon-phases.${moon_phase}`)}
          />
        </HStack>
      </VStack>
    </Flex>
  )
}

export default Astro
