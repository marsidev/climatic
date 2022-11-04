import type { ForecastResponse } from '~/../../packages/shared'
import type { FC } from 'react'
import { Flex, FlexProps, HStack, Heading, Image, Text, VStack, chakra } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { formatInt, formatTemperature, getShortDate } from '@lib/intl'
import { ASSETS_URL } from '@lib/config'
import { useStore } from '@store'
import { getWeatherConditionTranslationKey } from '@/i18n/helpers'

interface ForecastProps extends FlexProps {
	data: ForecastResponse
}

export const Forecast: FC<ForecastProps> = ({ data, ...props }) => {
	const { t } = useTranslation()
	const temperatureUnit = useStore(s => s.temperatureUnit)
	const { forecast } = data
	const forecastFromTomorrow = forecast.slice(1)

	return (
		<Flex align='center' as='section' flexDir='column' id='forecast-section' px={2} {...props}>
			<Heading as='h4' className='section-heading'>
				{t('forecast-title', { d: forecastFromTomorrow.length })}
			</Heading>

			<VStack as='ul' className='section-list' spacing={2}>
				{forecastFromTomorrow.map(data => {
					const { timestamp, day } = data
					const { condition, temperature } = day
					const { icon: iconPath, name, id: conditionId } = condition

					const date = getShortDate(timestamp)
					const minTemp = temperature[temperatureUnit].min
					const maxTemp = temperature[temperatureUnit].max
					const minTempStr = formatTemperature(minTemp, temperatureUnit)
					const maxTempStr = formatInt(maxTemp)

					const conditionName = name.toLowerCase()
					const conditionTranslationKey = getWeatherConditionTranslationKey(conditionId, true)

					return (
						<HStack key={timestamp} as='li' className='section-list-item'>
							<Text as='span' minW='6.15em'>
								{date}
							</Text>

							<Text fontWeight={800}>
								<chakra.span color='red.600'>{maxTempStr}</chakra.span>
								<chakra.span> / </chakra.span>
								<chakra.span color='blue.600'>{minTempStr}</chakra.span>
							</Text>

							<Flex as='figure' justify='center'>
								<Image alt={`icono de clima ${conditionName}`} h={8} src={`${ASSETS_URL}/icons${iconPath}`} w={8} />
							</Flex>

							<Text as='span' fontSize='xs' textAlign='right' w='100px'>
								{t(conditionTranslationKey)}
							</Text>
						</HStack>
					)
				})}
			</VStack>
		</Flex>
	)
}

export default Forecast
