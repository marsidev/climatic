import type { ForecastResponse } from '@climatic/shared'
import type { BoxProps } from '@chakra-ui/react'

import { FC } from 'react'
import { Box, Spacer } from '@chakra-ui/react'
import { PermissionAlert, Forecast, Header, Temperature, WeatherStats } from '@components'

interface LayoutProps extends BoxProps {
  data: ForecastResponse
}

export const Layout: FC<LayoutProps> = ({ data }) => {
  return (
    <Box
      bg='linear-gradient(0deg, rgba(148,187,233,1) 35%, rgba(255,234,107,1) 100%)'
      className='container'
    >
      <PermissionAlert />
      <Box as='main' className='weather-card'>
        <Header data={data} />
        <Temperature data={data} py='48px' />
        <WeatherStats data={data} pb='32px' />
        <Spacer as='section' />
        <Forecast data={data} />
      </Box>
    </Box>
  )
}

export default Layout
