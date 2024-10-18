import { TokenSymbol } from '@/domain/types/TokenSymbol'
import { z } from 'zod'

export const ConvertStablesFormSchema = z.object({
  symbolFrom: z.string().transform(TokenSymbol),
  symbolTo: z.string().transform(TokenSymbol),
  amount: z.string().refine(
    (data) => {
      const value = Number.parseFloat(data)
      return data === '' || !Number.isNaN(value)
    },
    {
      message: 'Amount must be a valid number',
    },
  ),
  isMaxSelected: z.boolean().default(false),
})
export type ConvertStablesFormSchema = z.infer<typeof ConvertStablesFormSchema>