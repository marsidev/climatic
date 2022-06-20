import type { FC } from 'react'
import type { FormControlProps } from '@chakra-ui/react'
import type { Control } from 'react-hook-form'

import {
  FormControl,
  FormLabel,
  Icon,
  RadioGroup,
  Radio,
  Stack
} from '@chakra-ui/react'
import { useController } from 'react-hook-form'
import { MdInfo as InfoIcon } from 'react-icons/md'
import { ToolTip } from '@components'

export interface RadioOption {
  value: string
  label: string
}

export type RadioOptions = RadioOption[]

export interface RadioSelectorProps extends FormControlProps {
  control: Control<any>
  name: string
  id: string
  label: string
  tooltipLabel?: string
  options: RadioOptions
}

export const RadioSelector: FC<RadioSelectorProps> = props => {
  const {
    control,
    name,
    id,
    label,
    tooltipLabel,
    defaultValue = '',
    options,
    ...rest
  } = props

  const { field } = useController({ name, control, defaultValue })
  const { onChange, value, ref } = field

  return (
    <FormControl id={id} {...rest}>
      <FormLabel fontSize='md' fontWeight={600} htmlFor={id}>
        {label}

        {tooltipLabel && (
          <ToolTip id='spinner-icon' tooltipLabel='Obteniendo datos...'>
            <Icon as={InfoIcon} ml={2} verticalAlign='middle' />
          </ToolTip>
        )}
      </FormLabel>

      <RadioGroup
        ref={ref}
        name={name}
        size='sm'
        value={value}
        onChange={onChange}
      >
        <Stack direction='row' gap={2}>
          {options.map(o => (
            <Radio key={o.value} value={o.value}>
              {o.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </FormControl>
  )
}

export default RadioSelector
