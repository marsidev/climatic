import React from 'react'
import { Box, HStack, Icon, Spacer, Spinner, Text } from '@chakra-ui/react'
import { flag } from 'country-emoji'
import { RiMapPinLine as PinIcon } from 'react-icons/ri'
import { useStore } from '@store'

interface SearchItemResultProps {
  country: string
  name: string
  region: string
  url: string
  onSubmit: () => void
}

export const SearchItemResult = ({ name, region, country, url, onSubmit }: SearchItemResultProps) => {
  const { getForecastDataByQuery, loading, setLoading, setForecastQuery, forecastQuery } = useStore()

  const handleClick = (query: string) => {
    setLoading(true)
    setForecastQuery(query)
    getForecastDataByQuery({ query }).then(_data => {
      setLoading(false)
      onSubmit()
    })
  }

  const showSpinner = loading && forecastQuery === url

  return (
    <HStack
      as='a'
      borderRadius={8}
      borderWidth={1}
      cursor='pointer'
      mb={2}
      p={3}
      onClick={() => handleClick(url)}
    >
      <Icon as={PinIcon} h={5} mr={2} w={5} />

      <Box>
        <Text fontSize={16} fontWeight={600}>
          {name}
        </Text>

        <Text fontSize={14}>
          {region} - {country} {flag(country)}
        </Text>
      </Box>

      <Spacer />

      {showSpinner && <Spinner />}
    </HStack>
  )
}

export default SearchItemResult