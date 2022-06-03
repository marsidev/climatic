import '@styles/index.css'
import 'isomorphic-fetch'
import { theme } from '@lib'
import { App } from '@components'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill'

let container: any = null

document.addEventListener('DOMContentLoaded', () => {
  if (!container) {
    polyfillCountryFlagEmojis('Twemoji Mozilla')
    container = document.getElementById('root') as HTMLElement
    const root = createRoot(container)
    root.render(
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    )
  }
})
