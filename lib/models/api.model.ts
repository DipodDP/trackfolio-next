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

export interface Quotation {
    units: number
    nano: number

}

export interface MoneyValue {
    currency: string
    units: number
    nano: number

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
  quantity_lots: Quotation
  blocked: boolean
  blocked_lots: Quotation
  position_uid: string
  instrument_uid: string
  var_margin: MoneyValue
  expected_yield_fifo: Quotation
}

export interface ApiPortfolioResponse {
    expected_yield: Quotation
    positions: IPortfolioPosition[]
    account_id: string
    total_amount_portfolio: MoneyValue
}


