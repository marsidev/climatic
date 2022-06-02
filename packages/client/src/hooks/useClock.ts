import { useEffect, useState } from 'react'

const options: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
}

const locale: string = 'es-ES'

export const useClock = (): string => {
  const [time, setTime] = useState<Date>(new Date())

  const formatTime = (time: Date) => new Intl.DateTimeFormat(locale, options).format(time)

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000)

    return () => clearInterval(timerId)
  }, [])

  return formatTime(time)
}

export default useClock
