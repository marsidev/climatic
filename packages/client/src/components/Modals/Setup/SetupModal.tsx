import type { Locale, TemperatureUnit, SpeedUnit, PressureUnit } from '@climatic/shared'
import type { FC } from 'react'

import { useEffect } from 'react'
import { chakra } from '@chakra-ui/react'
import { Modal } from '@components'
import { useForm } from 'react-hook-form'
import { RadioSelector } from './RadioSelector'
import { Select } from './Select'
import { useStore } from '@store'
import { loadAsyncLanguage, extractLocaleFromPath } from '@/i18n'
import { DEFAULT_LOCALE, SUPPORTED_LANGUAGES } from '@climatic/shared/src/i18n'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface SetupModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormValues {
  temperatureUnit: TemperatureUnit
  speedUnit: SpeedUnit
  pressureUnit: PressureUnit
  lang: Locale
}

interface TemperatureOption {
  value: TemperatureUnit
  label: string
}

interface SpeedOption {
  value: SpeedUnit
  label: string
}

interface PressureOption {
  value: PressureUnit
  label: string
}

interface LangOption {
  value: string
  label: string
}

export const SetupModal: FC<SetupModalProps> = ({ isOpen, onClose, ...rest }) => {
  const { control, watch, setValue } = useForm<FormValues>()
  const temperatureUnit = useStore(s => s.temperatureUnit)
  const speedUnit = useStore(s => s.speedUnit)
  const pressureUnit = useStore(s => s.pressureUnit)
  const switchTemperatureUnit = useStore(s => s.switchTemperatureUnit)
  const switchSpeedUnit = useStore(s => s.switchSpeedUnit)
  const switchPressureUnit = useStore(s => s.switchPressureUnit)
  // const fetching = useStore(s => s.fetching)
  const getForecastDataByQuery = useStore(s => s.getForecastDataByQuery)

  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  // check lang from url path and update hook-state
  useEffect(() => {
    const lang = extractLocaleFromPath(window.location.pathname)
    setValue('lang', lang)
  }, [])

  useEffect(() => {
    const subscription = watch((allValues, { name: updated }) => {
      const newValue = updated ? allValues[updated] : undefined

      if (newValue && updated === 'temperatureUnit') {
        // useStore.setState({ temperatureUnit: newValue as TemperatureUnit })
        switchTemperatureUnit()
      } else if (newValue && updated === 'speedUnit') {
        switchSpeedUnit()
      } else if (newValue && updated === 'pressureUnit') {
        switchPressureUnit()
      } else if (newValue && updated === 'lang') {
        setLang(newValue as Locale)
        getForecastDataByQuery(newValue as Locale)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

  const setLang = async (locale: Locale) => {
    const base = locale === DEFAULT_LOCALE ? '../' : `../${locale}`
    await loadAsyncLanguage(i18n, locale)
    navigate(base, { replace: true })
  }

  const langOptions: LangOption[] = SUPPORTED_LANGUAGES.map(l => {
    return { value: l.locale, label: l.name }
  })

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
