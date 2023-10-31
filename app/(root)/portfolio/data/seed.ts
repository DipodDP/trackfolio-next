import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})

export type Task = z.infer<typeof taskSchema>

export const Quotation = z.object({
    units: z.number(),
    nano: z.number()

})

export const MoneyValue = z.object(
{
    currency: z.string(),
    units: z.number(),
    nano: z.number()

})

export const shareSchema = z.object({
  ticker: z.string(),
  name: z.string(),
  instrument_type: z.string(),
  current_price: MoneyValue,
  quantity: Quotation,
  total: MoneyValue,
  proportion: z.string().nullable(),
  profit: z.string().nullable(),
})

export type Share = z.infer<typeof shareSchema>
