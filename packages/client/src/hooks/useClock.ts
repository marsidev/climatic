import { useEffect, useState } from 'react'
import { DEFAULT_LANGUAGE } from '@lib/config'

const locale = DEFAULT_LANGUAGE

export const useClock = (timeZone: string): string => {
  const [time, setTime] = useState<Date>(new Date())

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone
  }

  const formatTime = (time: Date) => new Intl.DateTimeFormat(locale, options).format(time)

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 5000)

    return () => clearInterval(timerId)
  }, [])

  return formatTime(time)
}

export default useClock
