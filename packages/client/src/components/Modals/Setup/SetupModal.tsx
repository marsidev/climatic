import type { TemperatureUnit, SpeedUnit, PressureUnit } from '@climatic/shared'
import type { FC } from 'react'

import { useEffect } from 'react'
import { chakra } from '@chakra-ui/react'
import { Modal } from '@components'
import { useForm } from 'react-hook-form'
import { RadioSelector } from './RadioSelector'
import { useStore } from '@store'

interface SetupModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormValues {
  temperatureUnit: TemperatureUnit
  speedUnit: SpeedUnit
  pressureUnit: PressureUnit
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

const temperatureUnitOptions: TemperatureOption[] = [
  { value: 'celsius', label: 'Celsius' },
  { value: 'fahrenheit', label: 'Fahrenheit' }
]

const pressureUnitOptions: PressureOption[] = [
  { value: 'mb', label: 'Milibar' },
  { value: 'in', label: 'Pulgadas de mercurio' }
]

const speedUnitOptions: SpeedOption[] = [
  { value: 'kph', label: 'Kilómetros por hora' },
  { value: 'mph', label: 'Millas por hora' }
]

export const SetupModal: FC<SetupModalProps> = ({ isOpen, onClose, ...rest }) => {
  const { control, watch } = useForm<FormValues>()
  const temperatureUnit = useStore(s => s.temperatureUnit)
  const speedUnit = useStore(s => s.speedUnit)
  const pressureUnit = useStore(s => s.pressureUnit)
  const switchTemperatureUnit = useStore(s => s.switchTemperatureUnit)
  const switchSpeedUnit = useStore(s => s.switchSpeedUnit)
  const switchPressureUnit = useStore(s => s.switchPressureUnit)

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
      }
    })

    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <Modal
      blockScrollOnMount={false}
      id='setup'
      isOpen={isOpen}
      motionPreset='slideInBottom'
      scrollBehavior='inside'
      showCloseIcon={true}
      size='md'
      title='Configuración'
      onClose={onClose}
      {...rest}
    >
      <chakra.form mb={4} w='100%'>
        <RadioSelector
          control={control}
          defaultValue={temperatureUnit}
          id='temperatureUnit'
          label='Unidad de temperatura'
          name='temperatureUnit'
          options={temperatureUnitOptions}
          size='sm'
        />

        <RadioSelector
          control={control}
          defaultValue={speedUnit}
          id='speedUnit'
          label='Unidad de velocidad del viento'
          mt={4}
          name='speedUnit'
          options={speedUnitOptions}
          size='sm'
        />

        <RadioSelector
          control={control}
          defaultValue={pressureUnit}
          id='pressureUnit'
          label='Unidad de presión atmosférica'
          mt={4}
          name='pressureUnit'
          options={pressureUnitOptions}
          size='sm'
        />
      </chakra.form>
    </Modal>
  )
}

export default SetupModal
