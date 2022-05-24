import 'isomorphic-fetch'
import '@styles/index.css'
import theme from '@lib/theme'
import App from '@/App'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

let container: any = null

document.addEventListener('DOMContentLoaded', () => {
  if (!container) {
    container = document.getElementById('root') as HTMLElement
    const root = createRoot(container)

    root.render(
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    )
  }
})
