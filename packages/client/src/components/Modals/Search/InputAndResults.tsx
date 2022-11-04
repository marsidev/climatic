import type { SearchItem } from '@climatic/shared'
import type { FlexProps } from '@chakra-ui/react'
import type { ChangeEvent, FC } from 'react'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Flex, Input, InputGroup, InputRightElement, Spinner, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { searchByQuery } from '@services'
import ResultItem from './ResultItem'

interface SearchInputProps extends FlexProps {
	closeModal: () => void
}

const InputAndResults: FC<SearchInputProps> = ({ closeModal }) => {
	const [query, setQuery] = useState<string>('')
	const [isLoading, setLoading] = useState<boolean>(false)
	const [data, setData] = useState<Array<SearchItem>>([])
	const [debouncedQuery] = useDebounce(query, 500)
	const [showData, setShowData] = useState<boolean>(false)
	const { t } = useTranslation()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value)

		if (e.target.value.length === 0) {
			setShowData(false)
			setData([])
		}
	}

	useEffect(() => {
		if (debouncedQuery && debouncedQuery.length >= 3) {
			setLoading(true)
			searchByQuery({ q: debouncedQuery }).then(d => {
				setData(d)
				setShowData(true)
				setLoading(false)
			})
		}
	}, [debouncedQuery])

	const onSubmit = () => {
		closeModal()
	}

	const noResults = data.length === 0 && query !== '' && showData && !isLoading
	const thereIsResults = data.length > 0 && query !== '' && showData && !isLoading

	return (
		<Flex flexDir='column' mb={4}>
			<InputGroup>
				<Input
					autoFocus
					autoComplete='off'
					placeholder={t('search-modal.input-placeholder')}
					type='text'
					onChange={handleChange}
				/>
				{isLoading && <InputRightElement children={<Spinner />} />}
			</InputGroup>

			<Flex className='search-results' flexDir='column' mt={2}>
				<Text fontWeight={600} id='search-heading' pt={4} textAlign='left'>
					{noResults && t('search-modal.no-results')}

					{thereIsResults && t('search-modal.results', { n: data.length })}
				</Text>

				{thereIsResults && data.map(d => <ResultItem key={d.id} onSubmit={onSubmit} {...d} />)}
			</Flex>
		</Flex>
	)
}

export default InputAndResults
