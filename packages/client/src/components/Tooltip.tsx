import type { BoxProps } from '@chakra-ui/react'
import type { TooltipProps } from 'react-tooltip'
import type { FC, ReactNode } from 'react'
import { Box } from '@chakra-ui/react'
import ReactTooltip from 'react-tooltip'

type Props = TooltipProps & BoxProps & {
	id: string
	tooltipLabel: string
	children: ReactNode
}

export const ToolTip: FC<Props> = props => {
	const {
		children,
		id,
		tooltipLabel,
		effect = 'solid',
		place = 'bottom',
		clickable = true,
		type = 'dark',
		delayHide = 0,
		delayShow = 500,
		...rest
	} = props

	return (
		<span data-for={id} data-tip={true}>
			{children}
			<ReactTooltip
				clickable={clickable}
				delayHide={delayHide}
				delayShow={delayShow}
				effect={effect}
				id={id}
				place={place}
				type={type}
			>
				<Box {...rest}>{tooltipLabel}</Box>
			</ReactTooltip>
		</span>
	)
}
