import { FlexProps, Icon, Spacer, Spinner } from '@chakra-ui/react'
import type { FC } from 'react'

import { Flex } from '@chakra-ui/react'
import { BsSearch as SearchIcon } from 'react-icons/bs'
import { MdMyLocation as GeoIcon } from 'react-icons/md'
// import { TiCogOutline as CogIcon } from 'react-icons/ti'
import { useStore } from '@store'
import { ToolTip } from '@components'
import { coordsToQuery, resolveQueryFromData } from '@lib'
import { useNavigate } from 'react-router-dom'
import { NavIcon } from './NavIcon'

interface NavbarProps extends FlexProps {
  openSearch: () => void
}

export const Navbar: FC<NavbarProps> = ({ openSearch, openSetup, ...props }) => {
  const grantPermission = useStore(s => s.grantPermission)
  const getForecastDataByCoords = useStore(s => s.getForecastDataByCoords)
  const setForecastQuery = useStore(s => s.setForecastQuery)
  const fetching = useStore(s => s.fetching)
  const getCoords = useStore(s => s.getCoords)

  const navigate = useNavigate()

  const getGeolocationForecast = async () => {
    grantPermission()

    getCoords().then(c => {
      getForecastDataByCoords().then(data => {
        const coordsQuery = coordsToQuery(c)
        const query = coordsQuery ? coordsQuery : resolveQueryFromData(data)

        setForecastQuery(query)
        navigate({ search: `q=${query}` })
      })
    })
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

      <ToolTip
        id='geolocation-icon'
        tooltipLabel='Obtener datos del clima de tu ubicación'
      >
        <NavIcon
          aria-label='geolocation icon'
          icon={<GeoIcon />}
          onClick={getGeolocationForecast}
        />
      </ToolTip>
    </Flex>
  )
}
