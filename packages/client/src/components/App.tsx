import type { FlexProps } from '@chakra-ui/react'
import type { FC } from 'react'
import { AppLayout, LoadingLayout } from '@components'
import { useForecast, useGeo } from '@hooks'

export const App: FC<FlexProps> = () => {
	useGeo()
	const forecastData = useForecast()

	if (!forecastData) return <LoadingLayout />

	return <AppLayout data={forecastData} />
}

export default App
