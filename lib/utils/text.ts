/**
 * Text formatting utilities
 */

/**
 * Capitalize first letter of each word
 *
 * @example
 * capitalizeWords("jan kowalski") // "Jan Kowalski"
 * capitalizeWords("ul. kwiatowa 1/4") // "Ul. Kwiatowa 1/4"
 */
export function capitalizeWords(str: string): string {
  if (!str) return str;
  return str.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

/**
 * Capitalize only first letter of string
 *
 * @example
 * capitalize("hello world") // "Hello world"
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
