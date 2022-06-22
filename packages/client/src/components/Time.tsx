/* eslint-disable react/display-name */
import type { ChakraProps } from '@chakra-ui/react'
import type { FC } from 'react'

import { memo } from 'react'
import { chakra } from '@chakra-ui/react'
import { useClock } from '@hooks'

interface TimeProps extends ChakraProps {
  timezone: string
}

export const Time: FC<TimeProps> = memo(({ timezone }) => {
  const time = useClock(timezone)
  return <chakra.span>{time}</chakra.span>
})
