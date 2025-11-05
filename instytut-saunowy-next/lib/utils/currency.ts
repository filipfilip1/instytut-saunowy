/**
 * Currency formatting utilities for consistent price display across the application
 * All prices are formatted in Polish złoty (PLN)
 */

/**
 * Format price with customizable decimal places
 * @param price - Price to format
 * @param fractionDigits - Number of decimal places (default: 2)
 * @returns Formatted price string (e.g., "123,45 zł")
 */
export function formatPrice(price: number, fractionDigits: number = 2): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(price);
}

/**
 * Format price with exact decimal places (always shows 2 decimal places)
 * Use for: checkouts, invoices, financial calculations
 * @param price - Price to format
 * @returns Formatted price string (e.g., "123,45 zł")
 */
export function formatPriceExact(price: number): string {
  return formatPrice(price, 2);
}

/**
 * Format price as rounded integer (no decimal places)
 * Use for: product displays, charts, summaries
 * @param price - Price to format
 * @returns Formatted price string (e.g., "123 zł")
 */
export function formatPriceRounded(price: number): string {
  return formatPrice(price, 0);
}

/**
 * Format price modifier (e.g., variant price difference)
 * Shows "+" for positive, "-" for negative
 * @param modifier - Price modifier
 * @returns Formatted modifier string (e.g., "+50 zł" or "-20 zł")
 */
export function formatPriceModifier(modifier: number): string {
  const formatted = formatPriceRounded(Math.abs(modifier));
  return modifier >= 0 ? `+${formatted}` : `-${formatted}`;
}