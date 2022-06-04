import '@styles/index.css'
import 'isomorphic-fetch'
import { theme } from '@lib'
import { App } from '@components'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

let container: any = null

const Content = (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route element={<App />} path='/'>
          <Route element={<App />} path=':query' />
        </Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
)

document.addEventListener('DOMContentLoaded', () => {
  if (!container) {
    polyfillCountryFlagEmojis('Twemoji Mozilla')
    container = document.getElementById('root') as HTMLElement
    const root = createRoot(container)
    root.render(Content)
  }
})
