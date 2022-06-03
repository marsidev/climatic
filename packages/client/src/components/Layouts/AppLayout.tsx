import type { ForecastResponse } from '@climatic/shared'
import type { BoxProps } from '@chakra-ui/react'

import { FC } from 'react'
import { Box, Spacer, useDisclosure } from '@chakra-ui/react'
import {
  Forecast,
  WeatherHeader,
  WeatherTemperature,
  WeatherStats,
  Astro,
  Navbar,
  SearchModal,
  Footer
} from '@components'

interface LayoutProps extends BoxProps {
  data: ForecastResponse
}

export const AppLayout: FC<LayoutProps> = ({ data }) => {
  const {
    isOpen: searchIsOpen,
    onClose: closeSearch,
    onOpen: openSearch
  } = useDisclosure()

  return (
    <Box
      bg='linear-gradient(0deg, rgba(225,148,233,1) 26%, rgba(107,242,255,1) 100%)'
      className='container'
    >
      <Box as='main' className='weather-card'>
        <Navbar openSearch={openSearch} />
        <WeatherHeader data={data} />
        <WeatherTemperature data={data} py='48px' />
        <WeatherStats data={data} pb='32px' />
        <Spacer as='section' />
        <Forecast data={data} pb='32px' />
        <Astro data={data} pb='32px' />
        <Footer />
      </Box>

      <SearchModal isOpen={searchIsOpen} onClose={closeSearch} />
    </Box>
  )
}

export default AppLayout
