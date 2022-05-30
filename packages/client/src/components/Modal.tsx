import { FC, ReactNode } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  ModalProps
} from '@chakra-ui/react'

type MyModalProps = ModalProps & {
  title: string
  showCloseIcon: boolean
  footer: ReactNode
}

const MyModal: FC<MyModalProps> = (props: MyModalProps) => {
  const {
    isOpen,
    onClose,
    title = '',
    size = 'md',
    showCloseIcon = false,
    onCloseComplete = () => {},
    children,
    footer,
    ...rest
  } = props

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      motionPreset='slideInBottom'
      size={size}
      onClose={onClose}
      onCloseComplete={onCloseComplete}
      {...rest}
    >
      <ModalOverlay/>
      <ModalContent>
        {title && <ModalHeader textAlign='center'>{title}</ModalHeader>}

        {showCloseIcon && <ModalCloseButton />}

        <ModalBody>{children}</ModalBody>

        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  )
}

export default MyModal
