import { FC } from 'react'
import { Icon, Flex } from '@chakra-ui/react'
import { TiLocationArrowOutline as ArrowIcon } from 'react-icons/ti'

interface WindDirectionIconProps {
  degree: number
}

export const WindDirectionIcon: FC<WindDirectionIconProps> = ({ degree }) => {
  const transform = `rotate(${-45 + degree}deg)`

  return (
    <Flex as='span'>
      <Icon as={ArrowIcon} transform={transform} />
    </Flex>
  )
}
