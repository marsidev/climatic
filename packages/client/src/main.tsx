import '@styles/index.css'
import 'isomorphic-fetch'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { polyfillCountryFlagEmojis } from 'country-flag-emoji-polyfill'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { App } from '@components'
import { theme } from '@lib'
import { extractLocaleFromPath, installI18n } from './i18n'

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
