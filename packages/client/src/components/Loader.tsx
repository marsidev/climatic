import type { FlexProps } from '@chakra-ui/react'

import { FC } from 'react'
import { Flex, Spinner } from '@chakra-ui/react'

export const Loader: FC<FlexProps> = ({ ...props }) => {
  return (
    <Flex align='center' h='100vh' justify='center' {...props}>
      <Spinner size='xl' />
    </Flex>
  )
}

export default Loader
