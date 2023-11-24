// server response
export interface InstrumentResponse<T> {
  // declare ServerResponse as general with generic
  instruments: T[]
}

// export interface ApiFindInstrumentResponse {
//   instruments: Instrument[]
// }

export interface IInstrumentShort {
  isin: string
  figi: string
  ticker: string
  class_code: string
  instrument_type: string
  name: string
  uid: string
  position_uid: string
  instrument_kind: number
  api_trade_available_flag: boolean
  for_iis_flag: boolean
  first_1min_candle_date: string
  first_1day_candle_date: string
  for_qual_investor_flag: boolean
  weekend_flag: boolean
  blocked_tca_flag: boolean
}

export interface IPortfolioPosition {
  figi: string
  instrument_type: string
  quantity: Quotation
  average_position_price: MoneyValue
  expected_yield: Quotation
  current_nkd: MoneyValue
  average_position_price_pt: Quotation
  current_price: MoneyValue
  average_position_price_fifo: MoneyValue
  expected_yield_fifo: Quotation
  ticker: string;
  name: string;
  lot: number;
  total: Quotation;
  proportion: string;
  proportion_in_portfolio: string;
  profit: null | string;
  profit_fifo: null | string;
}

export interface IPlanPortfolioPosition {
  figi: string
  instrument_type: string
  quantity: Quotation
  average_position_price: MoneyValue
  expected_yield: Quotation
  current_nkd: MoneyValue
  average_position_price_pt: Quotation
  current_price: MoneyValue
  average_position_price_fifo: MoneyValue
  expected_yield_fifo: Quotation
  ticker: string;
  name: string;
  lot: number;
  total: Quotation;
  proportion: string;
  proportion_in_portfolio: string;
  profit: null | string;
  profit_fifo: null | string;
  plan_quantity: Quotation;
  plan_total: MoneyValue;
  plan_proportion_in_portfolio: string;
  to_buy_lots: Quotation;
}

export interface ProportionInPortfolio {
  bonds: string;
  shares: string;
  etf: string;
  currencies: string;
  futures: string;
  options: string;
  sp: string;
}

export interface IPortfolioResponse {
  total_amount_shares: MoneyValue;
  total_amount_bonds: MoneyValue;
  total_amount_etf: MoneyValue;
  total_amount_currencies: MoneyValue;
  expected_yield: Quotation;
  positions: IPlanPortfolioPosition[];
  account_id: string;
  total_amount_portfolio: MoneyValue;
  proportion_in_portfolio: ProportionInPortfolio;
  plan_positions: IPlanPortfolioPosition[];
}

export interface IStructureResponse {
  total_amount: MoneyValue
  risk_profile: string;
  max_risk_part_drawdown: string;
  risk_proportion: string;
  corp_bonds_proportion: string;
  shares_proportion: string;
  current_structure: PortfolioRiskParts;
  plan_structure: PortfolioRiskParts;
}

export interface Quotation {
  units: number
  nano: number

}

export interface MoneyValue {
  currency: string
  units: number
  nano: number

}

export interface PortfolioRiskParts {
    high_risk_part: HighRiskPart;
    low_risk_part:  LowRiskPart;
}

export interface HighRiskPart {
  etf_proportion: number;
  shares_proportion: number;
  etf_amount: MoneyValue;
  shares_amount: MoneyValue;
  high_risk_total_amount: MoneyValue;
  high_risk_total_proportion: number;
}

export interface LowRiskPart {
  gov_bonds_proportion: number;
  corp_bonds_proportion: number;
  gov_bonds_amount: MoneyValue;
  corp_bonds_amount: MoneyValue;
  low_risk_total_amount: MoneyValue;
  low_risk_total_proportion: number;
}
