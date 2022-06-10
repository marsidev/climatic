import { FlexProps } from '@chakra-ui/react'
import type { FC } from 'react'

import { Box, Heading, HStack, Skeleton, VStack } from '@chakra-ui/react'

export const LoadingLayout: FC<FlexProps> = () => {
  return (
    <Box className='container'>
      <Box as='main' className='weather-card app-skeleton'>
        <VStack align='center' flexDir='column' mt={4}>
          <Skeleton w='90%'>
            <Heading as='h2' fontSize={48}>
              Location
            </Heading>
          </Skeleton>

          <Skeleton w='90%'>
            <Heading as='h3' fontSize={24} lineHeight={1}>
              Condition
            </Heading>
          </Skeleton>

          <Skeleton w='40%'>
            <Heading as='h3' fontSize={96} lineHeight={1}>
              20
            </Heading>
          </Skeleton>

          <HStack align='center' as='ul' justify='center' pt={8} w='90%'>
            <Skeleton as='li' borderRadius={12} height='75px' w='20%' />
            <Skeleton as='li' borderRadius={12} height='75px' w='20%' />
            <Skeleton as='li' borderRadius={12} height='75px' w='20%' />
            <Skeleton as='li' borderRadius={12} height='75px' w='20%' />
          </HStack>
        </VStack>

        <VStack gap={2} mt={8}>
          <Skeleton height='30px' w='90%' />
          <Skeleton height='30px' w='90%' />
          <Skeleton height='30px' w='90%' />
          <Skeleton height='30px' w='90%' />
          <Skeleton height='30px' w='90%' />
          <Skeleton height='30px' w='90%' />
          <Skeleton height='30px' w='90%' />
        </VStack>
      </Box>
    </Box>
  )
}

export default LoadingLayout
