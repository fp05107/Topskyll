import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../../shared/schema";

// Initialize database connection
const connectionString = process.env.DATABASE_URL || "postgresql://localhost:5432/topskyll";

export const connection = neon(connectionString);
export const db = drizzle(connection, { schema });

// Currency configuration with exchange rates (in base currency: USD)
export const SUPPORTED_CURRENCIES = {
  USD: { symbol: "$", name: "US Dollar", rate: 1.0 },
  EUR: { symbol: "€", name: "Euro", rate: 0.85 },
  GBP: { symbol: "£", name: "British Pound", rate: 0.75 },
  INR: { symbol: "₹", name: "Indian Rupee", rate: 82.0 },
  CAD: { symbol: "C$", name: "Canadian Dollar", rate: 1.35 },
  AUD: { symbol: "A$", name: "Australian Dollar", rate: 1.55 },
  SGD: { symbol: "S$", name: "Singapore Dollar", rate: 1.35 },
} as const;

export type CurrencyCode = keyof typeof SUPPORTED_CURRENCIES;

// Helper functions for currency conversion
export function convertCurrency(amount: number, fromCurrency: CurrencyCode, toCurrency: CurrencyCode): number {
  if (fromCurrency === toCurrency) return amount;
  
  // Convert to USD first, then to target currency
  const usdAmount = amount / SUPPORTED_CURRENCIES[fromCurrency].rate;
  return usdAmount * SUPPORTED_CURRENCIES[toCurrency].rate;
}

export function formatCurrency(amount: number, currency: CurrencyCode): string {
  const currencyInfo = SUPPORTED_CURRENCIES[currency];
  
  if (currency === 'INR') {
    // Format Indian currency with lakhs and crores
    if (amount >= 10000000) {
      return `${currencyInfo.symbol}${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `${currencyInfo.symbol}${(amount / 100000).toFixed(0)}L`;
    }
  }
  
  // Format other currencies with K, M notation
  if (amount >= 1000000) {
    return `${currencyInfo.symbol}${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `${currencyInfo.symbol}${(amount / 1000).toFixed(0)}K`;
  }
  
  return `${currencyInfo.symbol}${amount.toLocaleString()}`;
}

export function getSalaryRange(minSalary: number, maxSalary: number, currency: CurrencyCode): string {
  if (!minSalary && !maxSalary) return "Salary not disclosed";
  
  if (minSalary && maxSalary) {
    return `${formatCurrency(minSalary, currency)} - ${formatCurrency(maxSalary, currency)} / year`;
  }
  
  return `${formatCurrency(minSalary || maxSalary, currency)} / year`;
}