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
