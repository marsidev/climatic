import { type ThemeConfig, extendTheme } from '@chakra-ui/react'
import { Dict } from '@chakra-ui/utils'

import '@fontsource/raleway/variable.css'
import '@fontsource/rubik/variable.css'
import '@fontsource/nunito/variable.css'
import '@fontsource/aileron/300.css'

const fonts = {
	heading: 'NunitoVariable, RalewayVariable, -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
	body: 'NunitoVariable, RalewayVariable, Roboto, -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
}

const config: ThemeConfig = {
	initialColorMode: 'light',
	useSystemColorMode: true
}

export const theme: Dict = extendTheme({ config, fonts })

export default theme
