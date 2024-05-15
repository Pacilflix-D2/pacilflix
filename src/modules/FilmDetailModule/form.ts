import { z } from 'zod'

export const FormSchema = z.object({
  description: z.string(),
  rating: z.string(),
})
