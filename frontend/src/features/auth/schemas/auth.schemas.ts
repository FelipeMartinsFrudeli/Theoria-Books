import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Use a valid email'),
  password: z.string().min(6, 'Password must have at least 6 characters'),
})

export const registerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Use a valid email'),
  password: z.string().min(6, 'Password must have at least 6 characters'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
