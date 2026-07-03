import { useMutation } from '@tanstack/react-query'
import { authService } from '@features/auth/services/auth.service'
import type { LoginInput, RegisterInput } from '@features/auth/types/auth.types'

export function useLogin() {
  return useMutation({ mutationFn: (input: LoginInput) => authService.login(input) })
}

export function useRegister() {
  return useMutation({ mutationFn: (input: RegisterInput) => authService.register(input) })
}
