import '@styles/index.css'
import 'isomorphic-fetch'
import { theme } from '@lib'
import { App } from '@components'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { installI18n, extractLocaleFromPath } from './i18n'
import { I18nextProvider } from 'react-i18next'

let container: any = null

document.addEventListener('DOMContentLoaded', async () => {
  if (!container) {
    polyfillCountryFlagEmojis('flag-emojis-polyfill')

    container = document.getElementById('root') as HTMLElement
    const root = createRoot(container)

    const lang = extractLocaleFromPath(window.location.pathname)
    const i18n = await installI18n(lang)

    root.render(
      <ChakraProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <Routes>
              <Route element={<App />} path='/' />
              <Route element={<App />} path='/en' />
              <Route element={<App />} path='/es' />
            </Routes>
          </BrowserRouter>
        </I18nextProvider>
      </ChakraProvider>
    )
  }
})
