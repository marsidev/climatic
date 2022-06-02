import type { MoonPhase } from '@climatic/shared'
import type { IconProps } from '@chakra-ui/react'

import { FC } from 'react'
import {
  WiMoonNew as NewMoonIcon,
  WiMoonFirstQuarter as FirstQuarterMoonIcon,
  WiMoonWaxingCrescent3 as WaxingCrescentMoonIcon,
  WiMoonWaxingGibbous3 as WaxingGibbousMoonIcon,
  WiMoonWaningGibbous3 as WaningGibbousMoonIcon,
  WiMoonWaningCrescent3 as WaningCrescentMoonIcon,
  WiMoonThirdQuarter as LastQuarterMoonIcon,
  WiMoonFull as FullMoonIcon
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
