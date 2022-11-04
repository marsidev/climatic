import type {
	Locale,
	PressureUnit,
	SpeedUnit,
	TemperatureUnit
} from '@climatic/shared'

export interface SetupModalProps {
	isOpen: boolean
	onClose: () => void
}

export interface FormValues {
	temperatureUnit: TemperatureUnit
	speedUnit: SpeedUnit
	pressureUnit: PressureUnit
	lang: Locale
}

export interface TemperatureOption {
	value: TemperatureUnit
	label: string
}

export interface SpeedOption {
	value: SpeedUnit
	label: string
}

export interface PressureOption {
	value: PressureUnit
	label: string
}

export interface LangOption {
	value: string
	label: string
}
