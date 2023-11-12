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
  proportion_in_portfolio: z.string().nullable(),
  profit: z.string().nullable(),
})

export const structureSchema = z.object({
  total_amount: MoneyValue,
  high_risk_part: z.object({
    etf_proportion: z.string().nullable(),
    shares_proportion: z.string().nullable(),
    etf_amount: MoneyValue,
    shares_amount: MoneyValue,
    high_risk_total_amount: MoneyValue,
    high_risk_total_proportion: z.string().nullable()
  }),
  low_risk_part: z.object({
    gov_bonds_proportion:  z.string().nullable(),
    corp_bonds_proportion:  z.string().nullable(),
    gov_bonds_amount: MoneyValue,
    corp_bonds_amount: MoneyValue,
    low_risk_total_amount: MoneyValue,
    low_risk_total_proportion:  z.string().nullable()
  })
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

export type Share = z.infer<typeof shareSchema>
// export type Structure = z.infer<typeof structureSchema>
export type Proportion = z.infer<typeof proportionSchema>
