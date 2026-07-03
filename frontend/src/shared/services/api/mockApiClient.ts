import { apiDelay } from '@shared/services/api/apiDelay'

export async function mockApiClient<T>(data: T, delay = 280): Promise<T> {
  await apiDelay(delay)
  return structuredClone(data)
}
