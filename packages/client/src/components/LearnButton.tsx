import { FC } from 'react'
import { Link, Button, ButtonProps, LinkProps } from '@chakra-ui/react'
import { BiRightArrowAlt as RightArrow } from 'react-icons/bi'

type LearnButtonProps = ButtonProps & LinkProps & {
  content: string
}

const LearnButton: FC<LearnButtonProps> = ({ href, content, bg, leftIcon, ...rest }) => {
  return (
    <Button
      isExternal
      _active={{
        textDecoration: 'none',
        filter: 'brightness(85%)'
      }}
      _hover={{
        textDecoration: 'none',
        filter: 'brightness(90%)'
      }}
      as={Link}
      bg={bg}
      href={href}
      leftIcon={leftIcon || <RightArrow />}
      transition='all 0.2s'
      variant='solid'
      {...rest}
    >
      {content}
    </Button>
  )
}

export default LearnButton
