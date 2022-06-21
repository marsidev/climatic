import type { FlexProps } from '@chakra-ui/react'
import type { FC } from 'react'

import { Flex, Icon, Spacer, Spinner } from '@chakra-ui/react'
import { BsSearch as SearchIcon } from 'react-icons/bs'
import { MdMyLocation as GeoIcon } from 'react-icons/md'
import { TiCogOutline as CogIcon } from 'react-icons/ti'
import { useStore } from '@store'
import { ToolTip } from '@components'
import { coordsToQuery, resolveQueryFromData } from '@lib'
import { useNavigate } from 'react-router-dom'
import { NavIcon } from './NavIcon'
import { useTranslation } from 'react-i18next'

interface NavbarProps extends FlexProps {
  openSearch: () => void
  openSetup: () => void
}

export const Navbar: FC<NavbarProps> = ({ openSearch, openSetup, ...props }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const grantPermission = useStore(s => s.grantPermission)
  const getForecastDataByCoords = useStore(s => s.getForecastDataByCoords)
  const setForecastQuery = useStore(s => s.setForecastQuery)
  const fetching = useStore(s => s.fetching)
  const getCoords = useStore(s => s.getCoords)

  const getGeolocationForecast = async () => {
    grantPermission()

    getCoords().then(c => {
      getForecastDataByCoords().then(data => {
        if (!data.error) {
          const coordsQuery = coordsToQuery(c)
          const query = coordsQuery ? coordsQuery : resolveQueryFromData(data)

          setForecastQuery(query)
          navigate({ search: `q=${query}` })
        }
      })
    })
  }

  return (
    <Flex align='center' as='nav' gap={2} justify='flex-start' p={2} {...props}>
      {fetching && (
        <ToolTip
          fontSize='md'
          id='spinner-icon'
          tooltipLabel={t('tooltips.fetching')}
        >
          <Flex px={2}>
            <Icon as={Spinner} h={5} w={5} />
          </Flex>
        </ToolTip>
      )}

      <Spacer />

      <ToolTip
        fontSize='md'
        id='search-icon'
        tooltipLabel={t('tooltips.search')}
      >
        <NavIcon
          aria-label='search icon'
          icon={<SearchIcon />}
          onClick={openSearch}
        />
      </ToolTip>

      <ToolTip
        fontSize='md'
        id='geolocation-icon'
        tooltipLabel={t('tooltips.geolocation')}
      >
        <NavIcon
          aria-label='geolocation icon'
          icon={<GeoIcon />}
          onClick={getGeolocationForecast}
        />
      </ToolTip>

      <ToolTip
        fontSize='md'
        id='cog-icon'
        tooltipLabel={t('tooltips.setup')}
      >
        <NavIcon aria-label='cog icon' icon={<CogIcon />} onClick={openSetup} />
      </ToolTip>
    </Flex>
  )
}
