import { z } from 'zod'

export const pageJumpSchema = z.object({
  page: z.coerce.number().positive('Page must be positive'),
})
