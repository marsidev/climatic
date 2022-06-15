import {
  Box,
  chakra,
  HStack,
  Icon,
  Spacer,
  Spinner,
  Text
} from '@chakra-ui/react'
import { flag } from 'country-emoji'
import { RiMapPinLine as PinIcon } from 'react-icons/ri'
import { useStore } from '@store'
import { useNavigate } from 'react-router-dom'

interface SearchItemResultProps {
  country: string
  name: string
  region: string
  url: string
  onSubmit: () => void
}

const ResultItem = ({ name, region, country, onSubmit }: SearchItemResultProps) => {
  const {
    getForecastDataByQuery,
    fetching,
    setForecastQuery,
    forecastQuery
  } = useStore()
  const navigate = useNavigate()

  const itemQuery = `${name}-${country}`
    .toLowerCase()
    .replace(/ /g, '-')

  const handleClick = async () => {
    setForecastQuery(itemQuery)

    await getForecastDataByQuery()
    navigate({ search: `?q=${itemQuery}` })
    onSubmit()
  }

  const showSpinner = fetching && forecastQuery === itemQuery

  const emojiFlag = flag(country)

  return (
    <HStack
      as='a'
      borderRadius={8}
      borderWidth={1}
      className='search-item'
      cursor='pointer'
      mb={2}
      p={3}
      onClick={handleClick}
    >
      <Icon as={PinIcon} h={5} mr={2} w={5} />

      <Box>
        <Text fontSize={16} fontWeight={600}>
          {name}
        </Text>

        <Text fontSize={14}>
          {region && `${region} - `}
          {country}
          {emojiFlag && (
            <chakra.span className='emoji-font' fontSize={14}>
              {` ${emojiFlag}`}
            </chakra.span>
          )}
        </Text>
      </Box>

      <Spacer />

      {showSpinner && <Spinner />}
    </HStack>
  )
}

export default ResultItem
