import { FC, useState, useEffect } from 'react'
import { Alert, AlertIcon, FlexProps, HStack, IconButton, Spacer, Text } from '@chakra-ui/react'
import { MdMyLocation as GeoIcon, MdClose as CloseIcon } from 'react-icons/md'
import { useStore } from '@store'

export const PermissionAlert: FC<FlexProps> = ({ ...props }) => {
  const { grantPermission, locationStatus, isSupported, permission } = useStore()
  const [showAlert, setShowAlert] = useState(false)

  const showGeoButton =
    locationStatus !== 'success'
    && locationStatus !== 'denied'
    && isSupported
    && showAlert

  useEffect(() => {
    if (permission === 'prompt' && locationStatus === 'idle') {
      setShowAlert(true)
    }
  }, [locationStatus, permission])

  const hideAlert = () => setShowAlert(false)

  if (!showGeoButton) return null

  return (
    <Alert
      borderRadius={24}
      color='#000'
      flexDir='row'
      px={2}
      status='warning'
      variant='left-accent'
      {...props}
    >
      <AlertIcon />

      <Text fontSize={12}>
        Acepta el permiso de geolocalización para obtener el clima de tu ubicación.
      </Text>

      <Spacer />

      <HStack>
        <IconButton
          aria-label='Grant geolocation permission'
          borderRadius={9999}
          colorScheme='green'
          icon={<GeoIcon />}
          size='sm'
          variant='solid'
          onClick={grantPermission}
        />

        <IconButton
          aria-label='Close alert'
          borderRadius={9999}
          colorScheme='red'
          icon={<CloseIcon />}
          size='sm'
          variant='solid'
          onClick={hideAlert}
        />
      </HStack>
    </Alert>
  )
}

export default PermissionAlert
