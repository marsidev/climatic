import type { FlexProps } from '@chakra-ui/react'

import { FC, ReactNode } from 'react'
import { chakra, Flex } from '@chakra-ui/react'

interface StatItemProps extends FlexProps {
  icon: ReactNode
  value: string
}

const statItemStyle: FlexProps = {
  as: 'li',
  align: 'center',
  border: '1px solid',
  borderColor: 'blackAlpha.700',
  borderRadius: 8,
  fontFamily: 'RubikVariable, san-serif',
  justify: 'center',
  minH: '50px',
  minW: ['4.5em', '4.5em', '5em', '5em'],
  px: [1, 1, 2, 2],
  transition: 'all 150ms ease-in',
  fontSize: [16, 16, 18, 18]
}

export const StatCard: FC<StatItemProps> = ({ icon, value, ...props }) => {
  return (
    <Flex {...statItemStyle} {...props}>
      <chakra.figure>{icon}</chakra.figure>
      <chakra.span ml={1}>{value}</chakra.span>
    </Flex>
  )
}
