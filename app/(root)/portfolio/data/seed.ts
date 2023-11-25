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

// export const positionSchema = z.object({
//   ticker: z.string(),
//   name: z.string(),
//   instrument_type: z.string(),
//   current_price: MoneyValue,
//   quantity: Quotation,
//   total: MoneyValue,
//   proportion: z.string().nullable(),
//   proportion_in_portfolio: z.string().nullable(),
//   profit: z.string().nullable(),
// })
//
// export const planPositionSchema = z.object({
//   ticker: z.string(),
//   name: z.string(),
//   instrument_type: z.string(),
//   plan_quantity: Quotation,
//   plan_total: MoneyValue,
//   plan_proportion_in_portfolio: z.string().nullable(),
//   to_buy_lots: Quotation,
//   target_profit: z.string(),
//   exit_drawdown: z.string(),
//   exit_profit_price: MoneyValue,
//   exit_loss_price: MoneyValue,
//   target_progress: z.string().nullable(),
// })

export const portfolioSchema = z.object({
  ticker: z.string(),
  name: z.string(),
  instrument_type: z.string(),
  current_price: MoneyValue,
  quantity: Quotation,
  total: MoneyValue,
  proportion: z.string().nullable(),
  proportion_in_portfolio: z.string().nullable(),
  profit: z.string().nullable(),
  plan_quantity: Quotation,
  plan_total: MoneyValue,
  plan_proportion_in_portfolio: z.string().nullable(),
  to_buy_lots: Quotation,
  target_profit: z.string(),
  exit_drawdown: z.string(),
  exit_profit_price: MoneyValue,
  exit_loss_price: MoneyValue,
  target_progress: z.string().nullable(),
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

export const riskPartSchema = z.object({
  type: z.string(),
  sum: MoneyValue,
  proportion: z.string().nullable(),
  plan_sum: MoneyValue,
  plan_proportion: z.string().nullable(),
  format: z.boolean(),
  disbalance: z.number().nullable(),
})

// export type Position = z.infer<typeof positionSchema>
export type RiskPart = z.infer<typeof riskPartSchema>
export type Portfolio = z.infer<typeof portfolioSchema>
