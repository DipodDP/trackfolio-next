import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { MoneyValue, Quotation } from "./models/portfolio.api.model"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function quotationToDecimal(quotation: MoneyValue | Quotation) {
    const fractional = quotation.nano / 1e9
    return quotation.units + fractional
}

export function formatCurrency(amount: MoneyValue) {
    // Format the amount as a currency amount
    return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: amount.currency,
        maximumSignificantDigits: 4
    }).format(quotationToDecimal(amount))
}
