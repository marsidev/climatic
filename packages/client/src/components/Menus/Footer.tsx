import type { StackProps } from '@chakra-ui/react'
import type { FC } from 'react'
import { IconButton, Link, Stack, Text } from '@chakra-ui/react'
import { FiGithub } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { defaultNavIconProps } from './NavIcon'

type FooterProps = StackProps

export const Footer: FC<FooterProps> = ({ ...props }) => {
	const { t } = useTranslation()

	return (
		<Stack
			align='center'
			as='footer'
			direction='row'
			justify='center'
			p={2}
			{...props}
		>
			<Stack align='center' direction='row' justify='space-between' w='90%'>
				<Text fontSize={['md', 'lg']}>
					{t('footer.made-by')}{' '}
					<Link
						isExternal
						href='https://twitter.com/marsigliacr'
						title={t('tooltips.twitter')}
					>
						<strong>Luis Marsiglia</strong>
					</Link>
				</Text>

				<Link
					isExternal
					href='https://github.com/marsidev/climatic'
					title={t('tooltips.source')}
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

export default Footer
