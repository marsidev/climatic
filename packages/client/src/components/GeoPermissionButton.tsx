import { FC } from 'react'
import { Flex, FlexProps, IconButton } from '@chakra-ui/react'
import { MdMyLocation as GeoIcon } from 'react-icons/md'
import useLocation from '@hooks/useLocation'

const GeoPermissionButton: FC<FlexProps> = ({ ...props }) => {
  const { grantPermission, status } = useLocation()
  const showGeoButton = status === 'error' || status === 'not_supported' || status === 'denied'

  if (!showGeoButton) return null

  return (
    <Flex flexDir='row' justify='flex-end' pr={2} {...props}>
      <IconButton
        aria-label='Grant geolocation permission'
        borderRadius='full'
        colorScheme='pink'
        icon={<GeoIcon />}
        variant='solid'
        onClick={grantPermission}
      />
    </Flex>
  )
}

export default GeoPermissionButton
