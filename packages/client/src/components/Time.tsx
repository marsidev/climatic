/* eslint-disable react/display-name */
import type { ForecastResponse } from '@climatic/shared'
import type { ChakraProps } from '@chakra-ui/react'
import type { FC } from 'react'

import { memo } from 'react'
import { chakra } from '@chakra-ui/react'
import { useClock } from '@hooks'
import { useStore } from '@store'

export const Time: FC<ChakraProps> = memo(() => {
  const forecastData = useStore().forecastData as ForecastResponse
  const timeZone = forecastData.location.timezone

  const time = useClock(timeZone)
  return <chakra.span>{time}</chakra.span>
})
