import { z } from "zod"

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

export const positionSchema = z.object({
  ticker: z.string(),
  name: z.string(),
  instrument_type: z.string(),
  current_price: MoneyValue,
  quantity: Quotation,
  total: MoneyValue,
  proportion: z.string().nullable(),
  proportion_in_portfolio: z.string().nullable(),
  profit: z.string().nullable(),
})

export const proportionSchema = z.object({
  type: z.string(),
  sum: MoneyValue,
  proportion: z.string().nullable(),
  plan_sum: MoneyValue,
  plan_proportion: z.string().nullable(),
  format: z.boolean(),
  disbalance: z.number().nullable(),
})

export type Share = z.infer<typeof positionSchema>
export type Proportion = z.infer<typeof proportionSchema>
