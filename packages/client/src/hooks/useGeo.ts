import { useEffect } from 'react'
// import { toast } from 'react-toastify'
import { useStore } from '@store'

export const useGeo = () => {
  const { getCoords, isSupported, localStorageReaded, permission, initLocalStorage } = useStore()

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
