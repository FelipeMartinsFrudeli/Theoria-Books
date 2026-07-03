import { apiDelay } from '@shared/services/api/apiDelay'
import { tokenService } from '@shared/services/token/token.service'

export async function refreshMockToken() {
  await apiDelay(240)
  const token = `mock-access-${Date.now()}`
  tokenService.setAccessToken(token)
  return token
}
