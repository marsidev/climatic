import type { FlexProps } from '@chakra-ui/react'
import type { ReactNode } from 'react'

import { FC } from 'react'
import { chakra, Flex } from '@chakra-ui/react'
import { ToolTip } from '@components'

interface StatItemProps extends FlexProps {
  ariaLabel: string
  icon: ReactNode
  value: string
  tooltipId: string
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

export const StatCard: FC<StatItemProps> = ({ ariaLabel, tooltipId, icon, value, ...props }) => {
  return (
    <ToolTip id={tooltipId} tooltipLabel={ariaLabel}>
      <Flex {...statItemStyle} {...props}>
        <chakra.figure>{icon}</chakra.figure>
        <chakra.span ml={1}>{value}</chakra.span>
      </Flex>
    </ToolTip>
  )
}
