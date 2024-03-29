/* @ref: https://testing-library.com/docs/react-testing-library/setup/ */
import type { FC, ReactElement, JSXElementConstructor } from 'react'

import { render, RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { theme } from '@lib'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { installI18n, extractLocaleFromPath } from './i18n'
import 'isomorphic-fetch'
import React from 'react'

interface Render {
  (ui: ReactElement, opts?: Omit<RenderOptions, 'wrapper'>): ReturnType<
    typeof render
  >
}

const Providers: FC<{
  children:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | null
    | undefined
}> = ({ children }) => {
  const lang = extractLocaleFromPath(window.location.pathname)
  const i18n = installI18n(lang)

  return (
    <ChakraProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <Routes>
            <Route element={children} path='/' />
            <Route element={children} path='/en' />
            <Route element={children} path='/es' />
          </Routes>
        </BrowserRouter>
      </I18nextProvider>
    </ChakraProvider>
  )
}

const customRender: Render = (ui, opts) => {
  window.history.pushState({}, 'ES page', '/es')

  // return render(ui, { wrapper: Providers, ...opts })
  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Providers, ...opts })
  }
}

export * from '@testing-library/react'
export { customRender as render }
