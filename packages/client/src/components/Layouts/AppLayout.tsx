import type { ForecastResponse } from '@climatic/shared'
import type { BoxProps } from '@chakra-ui/react'
import type { FC } from 'react'

import { lazy, Suspense } from 'react'
import { Box, useDisclosure } from '@chakra-ui/react'
import {
  Forecast,
  WeatherHeader,
  WeatherTemperature,
  WeatherStats,
  Navbar
} from '@components'

const SearchModal = lazy(() => import('@components/Modals/Search/SearchModal'))
const SetupModal = lazy(() => import('@components/Modals/Setup/SetupModal'))
const Astro = lazy(() => import('@components/Astro'))
const Footer = lazy(() => import('@components/Menus/Footer'))

interface LayoutProps extends BoxProps {
  data: ForecastResponse
}

export const AppLayout: FC<LayoutProps> = ({ data }) => {
  const {
    isOpen: searchIsOpen,
    onClose: closeSearch,
    onOpen: openSearch
  } = useDisclosure()

  const {
    isOpen: setupIsOpen,
    onClose: closeSetup,
    onOpen: openSetup
  } = useDisclosure()

  return (
    <Box
      bg='linear-gradient(0deg, rgba(225,148,233,1) 26%, rgba(107,242,255,1) 100%)'
      className='container'
    >
      <Box as='main' className='weather-card'>
        <Navbar openSearch={openSearch} openSetup={openSetup} />
        <WeatherHeader data={data} />
        <WeatherTemperature data={data} py='48px' />
        <WeatherStats data={data} pb='32px' />
        <Forecast data={data} pb='32px' />

        <Suspense>
          <Astro data={data} pb='32px' />
          <Footer />
        </Suspense>
      </Box>

      <Suspense>
        <SearchModal isOpen={searchIsOpen} onClose={closeSearch} />
        <SetupModal isOpen={setupIsOpen} onClose={closeSetup} />
      </Suspense>
    </Box>
  )
}

export default AppLayout
