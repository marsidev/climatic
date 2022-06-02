import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { Dict } from '@chakra-ui/utils'

import '@fontsource/raleway/variable.css'
import '@fontsource/rubik/variable.css'
import '@fontsource/nunito/variable.css'
import '@fontsource/roboto/300.css'
import '@fontsource/aileron/300.css'
import '@fontsource/lato/300.css'

const components = {
  Button: {
    baseStyle: {
      _focus: {
        boxShadow: 'none'
      }
    }
  }
}

const fonts = {
  heading: 'NunitoVariable, RalewayVariable, -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
  body: 'NunitoVariable, RalewayVariable, Roboto, -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"'
}

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true
}

export const theme: Dict = extendTheme({ config, components, fonts })

export default theme
