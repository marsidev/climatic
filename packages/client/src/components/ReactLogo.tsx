import logo from '@assets/logo.svg'
import { Image, keyframes, usePrefersReducedMotion } from '@chakra-ui/react'

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const ReactLogo = () => {
  const prefersReducedMotion = usePrefersReducedMotion()

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 10s linear`

  return (
    <Image
      alt='logo'
      animation={animation}
      h='40vmin'
      pointerEvents='none'
      src={logo}
    />
  )
}

export default ReactLogo
