import type { StackProps } from '@chakra-ui/react'

import { FC } from 'react'
import { IconButton, Link, Stack, Text } from '@chakra-ui/react'
import { FiGithub } from 'react-icons/fi'
import { defaultNavIconProps } from '@components/Navbar'

interface FooterProps extends StackProps { }

export const Footer: FC<FooterProps> = ({ ...props }) => {
  return (
    <Stack
      align='center'
      as='footer'
      direction='row'
      gap={2}
      justify='center'
      p={2}
      {...props}
    >
      <Stack align='center' direction='row' justify='space-between' w='90%'>
        <Text fontSize={18}>
          Hecho por{' '}
          <Link
            isExternal
            href='https://twitter.com/marsigliacr'
            title='@marsigliacr on Twitter '
          >
            <strong>Luis Marsiglia</strong>
          </Link>
        </Text>

        <Link
          isExternal
          href='https://github.com/marsidev/climatic'
          title='Source code'
        >
          <IconButton
            aria-label='github icon'
            icon={<FiGithub />}
            {...defaultNavIconProps}
          />
        </Link>
      </Stack>
    </Stack>
  )
}
