import { FC } from 'react'
import { Flex, FlexProps, IconButton } from '@chakra-ui/react'
import { MdMyLocation as GeoIcon } from 'react-icons/md'
import useGeo from '@hooks/useGeo'

const GeoPermissionButton: FC<FlexProps> = () => {
  const { grantPermission, status } = useGeo()
  const showGeoButton = status === 'error' || status === 'not_supported' || status === 'denied'

  if (!showGeoButton) return null

  return (
    <Flex border='1px solid' flexDir='row' justify='flex-end' >
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
