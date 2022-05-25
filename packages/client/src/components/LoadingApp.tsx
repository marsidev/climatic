import { FlexProps } from '@chakra-ui/react'
import { FC } from 'react'
import { Flex, Heading, Skeleton, VStack } from '@chakra-ui/react'

const Layout: FC<FlexProps> = () => {
  return (
    <Flex
      align='center'
      as='main'
      // bg='purple.300'
      color='white'
      flexDir='column'
      justify='flex-start'
      minH='100vh'
    >
      <Flex flexDir='column' maxW={500} w='100%'>
        <VStack align='center' flexDir='column' mt={4}>
          <Skeleton w='90%'>
            <Heading as='h2' fontSize={48}>Location</Heading>
          </Skeleton>

          <Skeleton w='90%'>
            <Heading as='h3' fontSize={24} lineHeight={1}>Condition</Heading>
          </Skeleton>

          <Skeleton w='40%'>
            <Heading as='h3' fontSize={96} lineHeight={1}>20</Heading>
          </Skeleton>
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
      </Flex>
    </Flex>
  )
}

export default Layout
