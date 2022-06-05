import type { SearchItem } from '@climatic/shared'
import type { FlexProps } from '@chakra-ui/react'
import type { FC, ChangeEvent } from 'react'

import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { Flex, Input, InputGroup, InputRightElement, Spinner, Text } from '@chakra-ui/react'
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
  const thereIsResults =
    data.length > 0 && query !== '' && showData && !isLoading

  return (
    <Flex flexDir='column' gap={2}>
      <InputGroup>
        <Input
          autoFocus
          autoComplete='off'
          placeholder='Escribe alguna ciudad...'
          type='text'
          onChange={handleChange}
        />
        {isLoading && <InputRightElement children={<Spinner />} />}
      </InputGroup>

      <Flex flexDir='column' mt={2}>
        {noResults && (
          <Text fontWeight={600} py={2} textAlign='left'>
            No se encontraron resultados 😞
          </Text>
        )}

        {thereIsResults && (
          <>
            <Text fontWeight={600} mb={2} mt={4} textAlign='left'>
              {`${data.length} resultados`}
            </Text>

            {data.map(d => (
              <ResultItem key={d.id} onSubmit={onSubmit} {...d} />
            ))}
          </>
        )}
      </Flex>
    </Flex>
  )
}

export default InputAndResults
