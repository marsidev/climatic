import { useEffect } from 'react'
import { FlexProps } from '@chakra-ui/react'

import { FC } from 'react'
import { Flex } from '@chakra-ui/react'
import useGeo from '@hooks/useGeo'
import GeoPermissionButton from '@components/GeoPermissionButton'
import MainWeather from '@components/MainWeather'

const App: FC<FlexProps> = ({ ...props }) => {
  const { latitude, longitude } = useGeo()
  // const fetchData = async () => {
  //   const data = await fetch('/api/ping').then(r => r.json())
  //   setData(data)
  // }

  useEffect(() => {
    console.log({ latitude, longitude })
  }, [latitude])

  return (
    <Flex
      as='main'
      bg='blue.300'
      color='white'
      display='flex'
      flexDir='column'
      justify='flex-start'
      minH='100vh'
      {...props}
    >
      <GeoPermissionButton />
      <MainWeather />

    </Flex>
  )
}

export default App
