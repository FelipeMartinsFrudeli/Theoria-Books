import { z } from 'zod'

export const addBookSchema = z.object({
  title: z.string().min(1, 'Book title is required'),
  author: z.string().min(1, 'Author is required'),
  description: z.string().min(1, 'Description is required'),
  totalPages: z.coerce.number().positive('Total pages must be positive'),
  category: z.string().min(1, 'Category is required'),
  coverUrl: z.string().optional(),
  sourceType: z.enum(['manual', 'pdf']),
  status: z.enum(['reading', 'finished', 'paused', 'want-to-read']),
})

export const importPdfSchema = z.object({
  title: z.string().min(1, 'Book title is required'),
})

export type AddBookFormValues = z.infer<typeof addBookSchema>
export type ImportPdfFormValues = z.infer<typeof importPdfSchema>
