import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form'

type SelectOption = {
  label: string
  value: string
}

type FormSelectFieldProps<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
  label: string
  options: SelectOption[]
}

export function FormSelectField<T extends FieldValues>({
  control,
  name,
  label,
  options,
}: FormSelectFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormControl fullWidth error={Boolean(fieldState.error)}>
          <InputLabel>{label}</InputLabel>
          <Select {...field} label={label}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {fieldState.error ? <FormHelperText>{fieldState.error.message}</FormHelperText> : null}
        </FormControl>
      )}
    />
  )
}
