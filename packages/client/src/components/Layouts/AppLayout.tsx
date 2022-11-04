import type { ForecastResponse } from '~/../../packages/shared'
import type { BoxProps } from '@chakra-ui/react'
import type { FC } from 'react'
import { Suspense, lazy } from 'react'
import { Box, useDisclosure } from '@chakra-ui/react'
import { Forecast, Navbar, WeatherHeader, WeatherStats, WeatherTemperature } from '@components'

const SearchModal = lazy(() => import('@components/Modals/Search/SearchModal'))
const SetupModal = lazy(() => import('@components/Modals/Setup/SetupModal'))
const Astro = lazy(() => import('@components/Astro'))
const Footer = lazy(() => import('@components/Menus/Footer'))

interface LayoutProps extends BoxProps {
	data: ForecastResponse
}

export const AppLayout: FC<LayoutProps> = ({ data }) => {
	const { isOpen: searchIsOpen, onClose: closeSearch, onOpen: openSearch } = useDisclosure()

	const { isOpen: setupIsOpen, onClose: closeSetup, onOpen: openSetup } = useDisclosure()

	return (
		<Box bg='linear-gradient(0deg, rgba(225,148,233,1) 26%, rgba(107,242,255,1) 100%)' className='container'>
			<Box as='main' className='weather-card'>
				<Navbar openSearch={openSearch} openSetup={openSetup} />
				<WeatherHeader data={data} py={10} />
				<WeatherTemperature data={data} pb={10} />
				<WeatherStats data={data} pb={10} />
				<Forecast data={data} pb={10} />

				<Suspense>
					<Astro data={data} pb={8} />
					<Footer />
				</Suspense>
			</Box>

			<Suspense>
				<aside>
					<SearchModal isOpen={searchIsOpen} onClose={closeSearch} />
					<SetupModal isOpen={setupIsOpen} onClose={closeSetup} />
				</aside>
			</Suspense>
		</Box>
	)
}

export default AppLayout
