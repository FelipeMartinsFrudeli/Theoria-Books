import { apiDelay } from '@shared/services/api/apiDelay'
import { tokenService } from '@shared/services/token/token.service'
import type { LoginInput, MockUser, RegisterInput } from '@features/auth/types/auth.types'

export const authService = {
  async login(input: LoginInput): Promise<MockUser> {
    await apiDelay()
    tokenService.setAccessToken(`mock-token-${Date.now()}`)
    return { name: input.email.split('@')[0], email: input.email }
  },
  async register(input: RegisterInput): Promise<MockUser> {
    await apiDelay()
    tokenService.setAccessToken(`mock-token-${Date.now()}`)
    return { name: input.name, email: input.email }
  },
}
