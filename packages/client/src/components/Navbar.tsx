import type { FlexProps, IconButtonProps } from '@chakra-ui/react'

import { FC, ReactElement } from 'react'
import { Flex, IconButton } from '@chakra-ui/react'
import { BsSearch as SearchIcon } from 'react-icons/bs'
import { MdMyLocation as GeoIcon } from 'react-icons/md'
// import { TiCogOutline as CogIcon } from 'react-icons/ti'
import { useStore } from '@store'
import { ToolTip } from '@components'

interface NavIconProps extends IconButtonProps {
  icon: ReactElement
}

interface NavbarProps extends FlexProps {
  openSearch: () => void
}

export const defaultNavIconProps = {
  _active: {
    bg: 'blackAlpha.200',
    transform: 'scale(1)'
  },
  _hover: {
    bg: 'blackAlpha.200',
    transform: 'scale(1.15)'
  },
  _focus: {
    outline: '1px solid var(--chakra-colors-blackAlpha-600)'
  },
  borderRadius: 'full',
  colorScheme: 'gray',
  fontSize: [18, 20],
  h: [10, 12],
  transition: 'all 200ms ease-in-out, background 50ms ease-in-out, border-color 0ms',
  variant: 'ghost',
  w: [10, 12]
}

const NavIcon: FC<NavIconProps> = ({ icon, ...props }) => {
  return (
    <IconButton
      icon={icon}
      {...defaultNavIconProps}
      {...props}
    />
  )
}

export const Navbar: FC<NavbarProps> = ({ openSearch, ...props }) => {
  const {
    grantPermission,
    getForecastDataByCoords,
    locationStatus,
    coords,
    setForecastQuery
  } = useStore()

  const getGeolocationForecast = () => {
    const { latitude, longitude } = coords ?? {}

    grantPermission()

    if (locationStatus !== 'loading') {
      getForecastDataByCoords()
      const query = `${latitude},${longitude}`
      setForecastQuery(query)
    }
  }

  return (
    <Flex align='center' as='nav' gap={2} justify='flex-end' p={2} {...props}>
      <ToolTip id='search-icon' tooltipLabel='Buscar por ubicación'>
        <NavIcon
          aria-label='search icon'
          icon={<SearchIcon />}
          onClick={openSearch}
        />
      </ToolTip>

      <ToolTip id='geolocation-icon' tooltipLabel='Obtener datos del clima de tu ubicación'>
        <NavIcon
          aria-label='geolocation icon'
          icon={<GeoIcon />}
          onClick={getGeolocationForecast}
        />
      </ToolTip>
    </Flex>
  )
}
