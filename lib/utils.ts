import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { MoneyValue, Quotation } from "./models/api.model"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function QuotationToDecimal(quotation: MoneyValue | Quotation) {
  const fractional = quotation.nano / 1e8
  return quotation.units + fractional
}
