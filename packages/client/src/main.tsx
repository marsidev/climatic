import '@styles/index.css'
import 'react-toastify/dist/ReactToastify.css'
import 'isomorphic-fetch'
import theme from '@lib/theme'
import App from '@components/App'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { Zoom, ToastContainer, ToastContainerProps } from 'react-toastify'

let container: any = null

const toastProps: ToastContainerProps = {
  position: 'top-center',
  autoClose: 1000,
  hideProgressBar: true,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: false,
  draggable: true,
  pauseOnHover: false,
  theme: 'dark',
  limit: 15,
  closeButton: false,
  transition: Zoom,
  icon: false
}

document.addEventListener('DOMContentLoaded', () => {
  if (!container) {
    container = document.getElementById('root') as HTMLElement
    const root = createRoot(container)
    root.render(
      <ChakraProvider theme={theme}>
        <App />
        <ToastContainer {...toastProps} />
      </ChakraProvider>
    )
  }
})
