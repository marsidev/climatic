import type { IconButtonProps } from '@chakra-ui/react'
import type { FC, ReactElement } from 'react'
import { IconButton } from '@chakra-ui/react'

interface NavIconProps extends IconButtonProps {
	icon: ReactElement
}

export const defaultNavIconProps = {
	_active: {
		bg: 'blackAlpha.200',
		transform: 'scale(1)'
	},
	_hover: {
		bg: 'blackAlpha.200',
		transform: 'scale(1.15)'
	},
	_focus: {
		outline: '1px solid var(--chakra-colors-blackAlpha-600)'
	},
	borderRadius: 'full',
	colorScheme: 'gray',
	fontSize: ['md', 'lg'],
	h: [10, 10],
	transition: 'all 200ms ease-in-out, background 50ms ease-in-out, border-color 0ms',
	variant: 'ghost',
	w: [10, 10]
}

export const NavIcon: FC<NavIconProps> = ({ icon, ...props }) => {
	return <IconButton icon={icon} {...defaultNavIconProps} {...props} />
}

export default NavIcon
