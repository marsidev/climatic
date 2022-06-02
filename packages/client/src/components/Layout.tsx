import type { ForecastResponse } from '@climatic/shared'
import type { BoxProps } from '@chakra-ui/react'

import { FC } from 'react'
import { Box, Spacer, useDisclosure } from '@chakra-ui/react'
import {
  Forecast,
  Header,
  Temperature,
  WeatherStats,
  Astro,
  Navbar,
  SearchModal
} from '@components'

interface LayoutProps extends BoxProps {
  data: ForecastResponse
}

export const Layout: FC<LayoutProps> = ({ data }) => {
  const { isOpen: searchIsOpen, onClose: closeSearch, onOpen: openSearch } = useDisclosure()

  return (
    <Box
      bg='linear-gradient(0deg, rgba(225,148,233,1) 26%, rgba(107,242,255,1) 100%)'
      className='container'
    >
      <Box as='main' className='weather-card'>
        <Navbar openSearch={openSearch} />
        <Header data={data} />
        <Temperature data={data} py='48px' />
        <WeatherStats data={data} pb='32px' />
        <Spacer as='section' />
        <Forecast data={data} pb='32px' />
        <Astro data={data} pb='32px' />
      </Box>

      <SearchModal isOpen={searchIsOpen} onClose={closeSearch} />
    </Box>
  )
}

export default Layout
