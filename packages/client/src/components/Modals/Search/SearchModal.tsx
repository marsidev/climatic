import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@components'
import InputAndResults from './InputAndResults'

interface SearchModalProps {
	isOpen: boolean
	onClose: () => void
}

export const SearchModal: FC<SearchModalProps> = ({ isOpen, onClose, ...rest }) => {
	const { t } = useTranslation()
	return (
		<Modal
			blockScrollOnMount={false}
			id='search'
			isOpen={isOpen}
			motionPreset='slideInBottom'
			scrollBehavior='inside'
			showCloseIcon={true}
			size='md'
			title={t('search-modal.title')}
			onClose={onClose}
			{...rest}
		>
			<InputAndResults closeModal={onClose} />
		</Modal>
	)
}

export default SearchModal
