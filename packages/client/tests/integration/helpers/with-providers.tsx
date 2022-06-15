/* @ref: https://testing-library.com/docs/react-testing-library/setup/ */
import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { theme } from '@lib'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'isomorphic-fetch'

interface Render {
  (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): ReturnType<
    typeof render
  >
}

const Providers: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={children} path='/' />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  )
}

const customRender: Render = (ui, opts) =>
  render(ui, { wrapper: Providers, ...opts })

export * from '@testing-library/react'
export { customRender as render }
