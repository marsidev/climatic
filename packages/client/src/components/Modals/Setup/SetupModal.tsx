import type { Locale } from '~/../../packages/shared'
import type { FC } from 'react'
import type { FormValues, LangOption, PressureOption, SetupModalProps, SpeedOption, TemperatureOption } from './types'
import { useEffect } from 'react'
import { chakra } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { DEFAULT_LOCALE, SUPPORTED_LANGUAGES } from '~/../../packages/shared/src/i18n'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '@store'
import { Modal } from '@components'
import { extractLocaleFromPath, loadAsyncLanguage } from '~/i18n'
import { Select } from './Select'
import { RadioSelector } from './RadioSelector'

const langOptions: LangOption[] = SUPPORTED_LANGUAGES.map(l => {
	return { value: l.locale, label: l.name }
})

export const SetupModal: FC<SetupModalProps> = ({ isOpen, onClose, ...rest }) => {
	const { control, watch, setValue } = useForm<FormValues>()
	const temperatureUnit = useStore(s => s.temperatureUnit)
	const speedUnit = useStore(s => s.speedUnit)
	const pressureUnit = useStore(s => s.pressureUnit)
	const switchTemperatureUnit = useStore(s => s.switchTemperatureUnit)
	const switchSpeedUnit = useStore(s => s.switchSpeedUnit)
	const switchPressureUnit = useStore(s => s.switchPressureUnit)

	const { t, i18n } = useTranslation()
	const navigate = useNavigate()
	const { search: searchParams } = useLocation()

	// check lang from url path and update hook-state
	useEffect(() => {
		const lang = extractLocaleFromPath(window.location.pathname)
		setValue('lang', lang)
	}, [])

	useEffect(() => {
		const subscription = watch((allValues, { name: updated }) => {
			const newValue = updated ? allValues[updated] : undefined

			if (newValue) {
				if (updated === 'temperatureUnit') {
					// useStore.setState({ temperatureUnit: newValue as TemperatureUnit })
					switchTemperatureUnit()
				} else if (updated === 'speedUnit') {
					switchSpeedUnit()
				} else if (updated === 'pressureUnit') {
					switchPressureUnit()
				} else if (updated === 'lang') {
					const locale = newValue as Locale
					setLang(locale, searchParams)
				}
			}
		})

		return () => subscription.unsubscribe()
	}, [watch, searchParams])

	const setLang = async (locale: Locale, params: string) => {
		const base = locale === DEFAULT_LOCALE ? '../' : `../${locale}`
		const path = base + params

		await loadAsyncLanguage(i18n, locale)
		navigate(path, { replace: true })
	}

	const temperatureUnitOptions: TemperatureOption[] = [
		{ value: 'celsius', label: t('setup-modal.temperature-unit.c') },
		{ value: 'fahrenheit', label: t('setup-modal.temperature-unit.f') }
	]

	const speedUnitOptions: SpeedOption[] = [
		{ value: 'kph', label: t('setup-modal.speed-unit.kph') },
		{ value: 'mph', label: t('setup-modal.speed-unit.mph') }
	]

	const pressureUnitOptions: PressureOption[] = [
		{ value: 'mb', label: t('setup-modal.pressure-unit.mb') },
		{ value: 'in', label: t('setup-modal.pressure-unit.in') }
	]

	return (
		<Modal
			blockScrollOnMount={false}
			id='setup'
			isOpen={isOpen}
			motionPreset='slideInBottom'
			scrollBehavior='inside'
			showCloseIcon={true}
			size='md'
			title={t('setup-modal.title')}
			onClose={onClose}
			{...rest}
		>
			<chakra.form mb={4} w='100%'>
				<Select
					control={control}
					defaultValue={DEFAULT_LOCALE}
					id='lang'
					label={t('setup-modal.lang')}
					name='lang'
					options={langOptions}
				/>

				<RadioSelector
					control={control}
					defaultValue={temperatureUnit}
					id='temperatureUnit'
					label={t('setup-modal.temperature-unit.title')}
					mt={4}
					name='temperatureUnit'
					options={temperatureUnitOptions}
				/>

				<RadioSelector
					control={control}
					defaultValue={speedUnit}
					id='speedUnit'
					label={t('setup-modal.speed-unit.title')}
					mt={4}
					name='speedUnit'
					options={speedUnitOptions}
				/>

				<RadioSelector
					control={control}
					defaultValue={pressureUnit}
					id='pressureUnit'
					label={t('setup-modal.pressure-unit.title')}
					mt={4}
					name='pressureUnit'
					options={pressureUnitOptions}
				/>
			</chakra.form>
		</Modal>
	)
}

export default SetupModal
