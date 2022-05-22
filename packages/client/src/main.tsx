import '@styles/index.css'
import theme from '@lib/theme'
import App from '@/App'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

const Content = () => (
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
)

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)
root.render(<Content />)
