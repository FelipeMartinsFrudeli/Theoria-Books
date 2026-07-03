import { z } from 'zod'

export const noteSchema = z.object({
  title: z.string().min(1, 'Note title is required'),
  markdownContent: z.string().min(1, 'Markdown content is required'),
  bookId: z.string().min(1, 'Linked book is required'),
  pageNumber: z.coerce.number().positive('Page must be positive'),
  chapter: z.string().optional(),
  tags: z.string().optional().default(''),
  isPrivate: z.boolean(),
  syncEnabled: z.boolean(),
})

export type NoteFormValues = z.infer<typeof noteSchema>
