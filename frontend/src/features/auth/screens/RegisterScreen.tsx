import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Link, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { FormTextField } from '@shared/components/forms/FormTextField'
import { AuthCard } from '@features/auth/components/AuthCard'
import { useRegister } from '@features/auth/hooks/useAuth'
import { registerSchema, type RegisterFormValues } from '@features/auth/schemas/auth.schemas'

export function RegisterScreen() {
  const navigate = useNavigate()
  const register = useRegister()
  const { control, handleSubmit } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '' },
  })

  const onSubmit = handleSubmit(async (values) => {
    await register.mutateAsync(values)
    navigate('/books')
  })

  return (
    <AuthCard title="Begin your reading practice" subtitle="Create a space for books, notes, and shared wisdom.">
      <Stack component="form" spacing={2} onSubmit={onSubmit}>
        <FormTextField control={control} name="name" label="Name" />
        <FormTextField control={control} name="email" label="Email" type="email" />
        <FormTextField control={control} name="password" label="Password" type="password" />
        <Button type="submit" variant="contained" disabled={register.isPending}>
          Create account
        </Button>
        <Link component={RouterLink} to="/login" sx={{ textAlign: 'center' }}>
          Return to your library
        </Link>
      </Stack>
    </AuthCard>
  )
}
