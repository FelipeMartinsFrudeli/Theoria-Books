import { z } from 'zod'

export const createStudyGroupSchema = z.object({
  name: z.string().min(1, 'Group name is required'),
  description: z.string().min(1, 'Description is required'),
  currentBookId: z.string().min(1, 'Current book is required'),
  privacy: z.enum(['public', 'private']),
})

export type CreateStudyGroupFormValues = z.infer<typeof createStudyGroupSchema>
