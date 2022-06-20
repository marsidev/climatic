import type { FC } from 'react'

import { Modal } from '@components'
import InputAndResults from './InputAndResults'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SearchModal: FC<SearchModalProps> = ({ isOpen, onClose, ...rest }) => {
  return (
    <Modal
      blockScrollOnMount={false}
      id='search'
      isOpen={isOpen}
      motionPreset='slideInBottom'
      scrollBehavior='inside'
      showCloseIcon={true}
      size='md'
      title='Buscar una ubicación'
      onClose={onClose}
      {...rest}
    >
      <InputAndResults closeModal={onClose} />
    </Modal>
  )
}

export default SearchModal
