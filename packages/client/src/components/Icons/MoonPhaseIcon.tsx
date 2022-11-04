import type { MoonPhase } from '~/../../packages/shared'
import type { IconProps } from '@chakra-ui/react'
import type { FC } from 'react'
import {
	WiMoonFirstQuarter as FirstQuarterMoonIcon,
	WiMoonFull as FullMoonIcon,
	WiMoonThirdQuarter as LastQuarterMoonIcon,
	WiMoonNew as NewMoonIcon,
	WiMoonWaningCrescent3 as WaningCrescentMoonIcon,
	WiMoonWaningGibbous3 as WaningGibbousMoonIcon,
	WiMoonWaxingCrescent3 as WaxingCrescentMoonIcon,
	WiMoonWaxingGibbous3 as WaxingGibbousMoonIcon
} from 'react-icons/wi'

interface MoonPhaseIconProps extends IconProps {
	phase: MoonPhase | string
}

const IconByPhase = {
	'New Moon': <NewMoonIcon />,
	'First Quarter': <FirstQuarterMoonIcon />,
	'Waxing Crescent': <WaxingCrescentMoonIcon />,
	'Waxing Gibbous': <WaxingGibbousMoonIcon />,
	'Waning Gibbous': <WaningGibbousMoonIcon />,
	'Waning Crescent': <WaningCrescentMoonIcon />,
	'Last Quarter': <LastQuarterMoonIcon />,
	'Full Moon': <FullMoonIcon />
}

export const MoonPhaseIcon: FC<MoonPhaseIconProps> = ({ phase }) => {
	const icon = IconByPhase[phase]
	return icon
}
