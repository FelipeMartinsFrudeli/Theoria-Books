import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Link, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { FormTextField } from '@shared/components/forms/FormTextField'
import { AuthCard } from '@features/auth/components/AuthCard'
import { useLogin } from '@features/auth/hooks/useAuth'
import { loginSchema, type LoginFormValues } from '@features/auth/schemas/auth.schemas'

export function LoginScreen() {
  const navigate = useNavigate()
  const login = useLogin()
  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = handleSubmit(async (values) => {
    await login.mutateAsync(values)
    navigate('/books')
  })

  return (
    <AuthCard title="Welcome back to Theoria Books" subtitle="Return to your path of reading and reflection.">
      <Stack component="form" spacing={2} onSubmit={onSubmit}>
        <FormTextField control={control} name="email" label="Email" type="email" />
        <FormTextField control={control} name="password" label="Password" type="password" />
        <Button type="submit" variant="contained" disabled={login.isPending}>
          Enter library
        </Button>
        <Link component={RouterLink} to="/register" sx={{ textAlign: 'center' }}>
          Begin your reading practice
        </Link>
      </Stack>
    </AuthCard>
  )
}
