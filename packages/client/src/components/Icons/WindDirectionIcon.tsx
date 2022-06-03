import type { FlexProps } from '@chakra-ui/react'

import { FC } from 'react'
import { Icon, Flex } from '@chakra-ui/react'
import { TiLocationArrowOutline as ArrowIcon } from 'react-icons/ti'
import { FiWind as WindIcon } from 'react-icons/fi'

interface WindDirectionIconProps extends FlexProps {
  degree: number
}

export const WindDirectionIcon: FC<WindDirectionIconProps> = ({ degree, ...props }) => {
  const transform = `rotate(${-45 + degree}deg)`

  return (
    <Flex as='figure' flexDir='column' gap={0} {...props}>
      <Icon as={WindIcon} />
      <Icon as={ArrowIcon} transform={transform} />
    </Flex>
  )
}
