import { FC } from 'react'
import { Flex, FlexProps, Heading } from '@chakra-ui/react'

const MainWeather: FC<FlexProps> = ({ ...props }) => {
  const temperature = 77
  const unit = 'celsius' // 'fahrenheit'
  const temperatureStr = new Intl.NumberFormat('es-ES', {
    style: 'unit',
    unit
  }).format(temperature)

  return (
    <Flex align='center' border='1px solid' flexDir='column' mt={4} {...props}>
      <Heading as='h2' fontSize={48} fontWeight={400}>
        Tokyo
      </Heading>
      <Heading as='h3' fontSize={24} fontWeight={400} lineHeight={1}>
        Mostly Cloud
      </Heading>
      <Heading as='h3' fontSize={96} fontWeight={400} lineHeight={1}>
        {temperatureStr}
      </Heading>
    </Flex>
  )
}

export default MainWeather
