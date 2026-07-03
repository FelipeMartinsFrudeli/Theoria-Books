import { TextField, type TextFieldProps } from '@mui/material'
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form'

type FormTextFieldProps<T extends FieldValues> = Omit<TextFieldProps, 'name'> & {
  control: Control<T>
  name: FieldPath<T>
}

export function FormTextField<T extends FieldValues>({ control, name, ...props }: FormTextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...props}
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message ?? props.helperText}
        />
      )}
    />
  )
}
