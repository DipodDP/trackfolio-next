import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { MoneyValue, Quotation } from "./models/portfolio.api.model"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function QuotationToDecimal(quotation: MoneyValue | Quotation) {
  const fractional = quotation.nano / 1e9
  return quotation.units + fractional
}
