import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const components = {
  Button: {
    baseStyle: {
      _focus: {
        boxShadow: 'none'
      }
    }
  }
}

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true
}

const theme = extendTheme({ config, components })

export default theme
