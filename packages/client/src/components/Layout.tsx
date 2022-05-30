import type { FlexProps } from '@chakra-ui/react'
import { FC } from 'react'
import { Flex } from '@chakra-ui/react'

export const Layout: FC<FlexProps> = ({ children }) => {
  return (
    <Flex
      align='center'
      as='main'
      bg='purple.300'
      color='white'
      flexDir='column'
      justify='flex-start'
      minH='100vh'
    >
      <Flex
        // border='2px solid purple'
        flexDir='column'
        h='full'
        justify='flex-start'
        maxW={500}
        w='100%'
      >
        {children}
      </Flex>
    </Flex>
  )
}

export default Layout
