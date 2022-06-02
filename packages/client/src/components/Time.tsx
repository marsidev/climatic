/* eslint-disable react/display-name */
import { FC, memo } from 'react'
import { chakra, ChakraProps } from '@chakra-ui/react'
import { useClock } from '@hooks'

export const Time: FC<ChakraProps> = memo(() => {
  const time = useClock()
  return <chakra.span>{time}</chakra.span>
})
