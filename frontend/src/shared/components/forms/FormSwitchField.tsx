import { FormControlLabel, Switch } from '@mui/material'
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form'

type FormSwitchFieldProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  label: string
}

export function FormSwitchField<T extends FieldValues>({ control, name, label }: FormSwitchFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControlLabel
          control={<Switch checked={Boolean(field.value)} onChange={(_, checked) => field.onChange(checked)} />}
          label={label}
        />
      )}
    />
  )
}
