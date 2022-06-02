import type { FlexProps, IconButtonProps } from '@chakra-ui/react'

import { FC, ReactElement } from 'react'
import { Flex, IconButton } from '@chakra-ui/react'
import { BsSearch as SearchIcon } from 'react-icons/bs'
import { MdMyLocation as GeoIcon } from 'react-icons/md'
// import { TiCogOutline as CogIcon } from 'react-icons/ti'
import { useStore } from '@store'

interface NavIconProps extends IconButtonProps {
  icon: ReactElement
}

interface NavbarProps extends FlexProps {
  openSearch: () => void
}

const NavIcon: FC<NavIconProps> = ({ icon, ...props }) => {
  return (
    <IconButton
      _active={{
        bg: 'blackAlpha.200',
        transform: 'scale(1)'
      }}
      _focus={{
        outline: '1px solid var(--chakra-colors-blackAlpha-600)'
      }}
      _hover={{
        bg: 'blackAlpha.200',
        transform: 'scale(1.15)'
      }}
      borderRadius='full'
      colorScheme='gray'
      fontSize={[18, 20]}
      h={[10, 12]}
      icon={icon}
      transition='all 200ms ease-in-out, background 50ms ease-in-out, border-color 0ms'
      variant='ghost'
      w={[10, 12]}
      {...props}
    />
  )
}

export const Navbar: FC<NavbarProps> = ({ openSearch, ...props }) => {
  const { grantPermission, locationStatus, isSupported } = useStore()

  const showGeoButton =
    locationStatus !== 'success' &&
    locationStatus !== 'denied' &&
    isSupported &&
    locationStatus === 'idle'

  return (
    <Flex align='center' as='nav' gap={2} justify='flex-end' p={2} {...props}>
      <NavIcon
        aria-label='search icon'
        icon={<SearchIcon />}
        onClick={openSearch}
      />

      {showGeoButton && (
        <NavIcon
          aria-label='geolocation icon'
          icon={<GeoIcon />}
          onClick={grantPermission}
        />
      )}

      {/* <NavIcon aria-label='configuration icon' icon={<CogIcon />} /> */}
    </Flex>
  )
}
