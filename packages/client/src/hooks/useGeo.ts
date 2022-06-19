import { useEffect } from 'react'
import { useStore } from '@store'

export const useGeo = () => {
  const getCoords = useStore(s => s.getCoords)
  const isSupported = useStore(s => s.isSupported)
  const localStorageReaded = useStore(s => s.localStorageReaded)
  const permission = useStore(s => s.permission)
  const initLocalStorage = useStore(s => s.initLocalStorage)

  // read local storage on mount
  useEffect(() => {
    initLocalStorage()
  }, [])

  // get current position if meets conditions
  useEffect(() => {
    if (isSupported && localStorageReaded && permission === 'granted') {
      getCoords()
    }
  }, [isSupported, localStorageReaded, permission])
}

export default useGeo
