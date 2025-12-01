/**
 * Complementary product categories
 * Maps product categories to categories that pair well with them
 */
export const COMPLEMENTARY_CATEGORIES: Record<string, string[]> = {
  kilty: ['akcesoria', 'poncha', 'zestawy'],
  poncha: ['akcesoria', 'kilty', 'zestawy'],
  pareo: ['akcesoria', 'topy', 'zestawy'],
  kimona: ['akcesoria', 'pareo', 'zestawy'],
  spodnice: ['akcesoria', 'topy', 'zestawy'],
  topy: ['akcesoria', 'spodnice', 'zestawy'],
  spodnie: ['bluzy', 'akcesoria', 'zestawy'],
  bluzy: ['spodnie', 'akcesoria', 'zestawy'],
  akcesoria: ['kilty', 'poncha', 'pareo', 'kimona'],
  zestawy: ['akcesoria'],
};
