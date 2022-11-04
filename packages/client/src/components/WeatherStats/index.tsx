import type { FC } from 'react'
import type { ForecastResponse } from '@climatic/shared'
import type { StackProps } from '@chakra-ui/react'
import { Flex, HStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { MdCloudQueue as CloudIcon, MdOutlineWaterDrop as DropIcon } from 'react-icons/md'
import { CgCompressV as PressureIcon } from 'react-icons/cg'
import { useStore } from '@store'
import { WindDirectionIcon } from '@components'
import { formatPressure, formatSpeed } from '@lib/intl'
import { StatCard } from './StatCard'

interface WeatherStatsProps extends StackProps {
	data: ForecastResponse
}

export const WeatherStats: FC<WeatherStatsProps> = ({ data, ...props }) => {
	const { t } = useTranslation()
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
					ariaLabel={t('tooltips.humidity')}
					icon={<DropIcon />}
					tooltipId='humidity-data'
					value={`${humidity}%`}
				/>

				<StatCard ariaLabel={t('tooltips.cloudly')} icon={<CloudIcon />} tooltipId='cloud-data' value={`${cloud}%`} />

				<StatCard
					ariaLabel={t('tooltips.wind-data')}
					icon={<WindDirectionIcon degree={degree} mr={1} />}
					tooltipId='wind-data'
					value={windSpeed}
				/>

				<StatCard
					ariaLabel={t('tooltips.pressure')}
					icon={<PressureIcon />}
					tooltipId='pressure-data'
					value={pressureValue}
				/>
			</HStack>
		</Flex>
	)
}
