import { FlexProps, Icon, Spacer, Spinner } from '@chakra-ui/react'

import { FC } from 'react'
import { Flex } from '@chakra-ui/react'
import { BsSearch as SearchIcon } from 'react-icons/bs'
import { MdMyLocation as GeoIcon } from 'react-icons/md'
// import { TiCogOutline as CogIcon } from 'react-icons/ti'
import { useStore } from '@store'
import { ToolTip } from '@components'
import { useNavigate } from 'react-router-dom'
import { NavIcon } from './NavIcon'

interface NavbarProps extends FlexProps {
  openSearch: () => void
}

export const Navbar: FC<NavbarProps> = ({ openSearch, ...props }) => {
  const {
    locationStatus,
    coords,
    grantPermission,
    getForecastDataByCoords,
    setForecastQuery,
    fetching
  } = useStore()

  const navigate = useNavigate()

  const getGeolocationForecast = async () => {
    const { latitude, longitude } = coords ?? {}

    grantPermission()

    if (locationStatus !== 'loading') {
      const query = `${latitude},${longitude}`
      setForecastQuery(query)

      await getForecastDataByCoords()
      navigate('/')
    }
  }

  return (
    <Flex align='center' as='nav' gap={2} justify='flex-start' p={2} {...props}>
      {fetching && (
        <ToolTip id='spinner-icon' tooltipLabel='Obteniendo datos...'>
          <Flex px={2}>
            <Icon as={Spinner} h={5} w={5} />
          </Flex>
        </ToolTip>
      )}

      <Spacer />

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