import type { ForecastResponse } from '~/../../packages/shared'
import type { FlexProps } from '@chakra-ui/react'
import type { FC } from 'react'
import { Flex, Heading, Image, Text, chakra } from '@chakra-ui/react'
import { flag } from 'country-emoji'
import { useTranslation } from 'react-i18next'
import { getLargeDate } from '@lib/intl'
import { ASSETS_URL } from '@lib/config'
import { Time } from '@components'
import { getWeatherConditionTranslationKey } from '~/i18n/helpers'

interface HeaderProps extends FlexProps {
	data: ForecastResponse
}

export const WeatherHeader: FC<HeaderProps> = ({ data, ...props }) => {
	const { t } = useTranslation()
	const { location, currentWeather } = data
	const { condition, updateAt, isDay } = currentWeather
	const { icon: conditionIconPath, name: conditionName, id: conditionId } = condition
	const { country, name: city, timezone } = location

	const date = getLargeDate(updateAt)
	const emojiFlag = flag(country)

	const conditionTranslationKey = getWeatherConditionTranslationKey(conditionId, isDay)

	return (
		<Flex align='center' as='header' flexDir='column' {...props}>
			<Heading as='h2' fontSize='5xl' fontWeight={300} id='location-name' lineHeight={1} textAlign='center'>
				{city}
				{emojiFlag && (
					<>
						<span>, </span>
						<chakra.span className='emoji-font' fontSize='4xl'>
							{emojiFlag}
						</chakra.span>
					</>
				)}
			</Heading>

			<Heading as='h3' fontSize='2xl' fontWeight={400} mt={1}>
				{date}
				{' - '}
				<Time timezone={timezone} />
			</Heading>

			<Flex align='center' as='h3' fontSize='2xl' fontWeight={400} justify='center'>
				<Text as='span' h='100%'>
					{t(conditionTranslationKey)}
				</Text>

				<Image
					alt={`${conditionName} icon`}
					display='inline-block'
					h={8}
					src={`${ASSETS_URL}/icons${conditionIconPath}`}
					w={8}
				/>
			</Flex>
		</Flex>
	)
}
