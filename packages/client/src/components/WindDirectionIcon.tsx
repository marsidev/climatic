import type { FlexProps } from '@chakra-ui/react'

import { FC } from 'react'
import { Icon, Flex } from '@chakra-ui/react'
import { TiLocationArrowOutline as ArrowIcon } from 'react-icons/ti'

interface WindDirectionIconProps extends FlexProps {
  degree: number
}

export const WindDirectionIcon: FC<WindDirectionIconProps> = ({ degree, ...props }) => {
  const transform = `rotate(${-45 + degree}deg)`

  return (
    <Flex as='figure' {...props}>
      <Icon as={ArrowIcon} transform={transform} />
    </Flex>
  )
}
