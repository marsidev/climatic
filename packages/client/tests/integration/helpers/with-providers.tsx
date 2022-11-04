/* @ref: https://testing-library.com/docs/react-testing-library/setup/ */
import type { FC, ReactElement, ReactNode } from 'react'
import { RenderOptions, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { theme } from '@lib'
import { extractLocaleFromPath, installI18n } from './i18n'
import 'isomorphic-fetch'

interface Render {
	(
		ui: ReactElement,
		opts?: Omit<RenderOptions, 'wrapper'>
	): ReturnType<typeof render>
}

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
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
