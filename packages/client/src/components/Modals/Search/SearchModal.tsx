import { FC } from 'react'
import { Flex } from '@chakra-ui/react'
import { Modal } from '@components'
import SearchInput from './SearchInput'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SearchModal: FC<SearchModalProps> = ({ isOpen, onClose, ...rest }) => {
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      motionPreset='slideInBottom'
      scrollBehavior='inside'
      showCloseIcon={true}
      size='lg'
      title='Buscar una ubicación'
      onClose={onClose}
      {...rest}
    >
      <Flex flexDir='column' justify='center' mb={4} w='100%'>
        <SearchInput closeModal={onClose} />
      </Flex>
    </Modal>
  )
}

export default SearchModal
