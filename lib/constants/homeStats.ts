/**
 * Homepage Experience Statement
 * Used in Section 4: Experience Block
 */

export interface ExperienceData {
  years: number;
  romanNumeral: string;
  headline: string;
  description: string;
}

/**
 * Years of experience in sauna culture
 * Displayed as elegant, centered statement block
 */
export const EXPERIENCE_DATA: ExperienceData = {
  years: 15,
  romanNumeral: 'XV',
  headline: 'Lat doświadczenia w kształtowaniu kultury saunowej w Polsce.',
  description:
    'Od pasji, przez setki godzin praktyki, aż po ten Instytut. Dzielimy się tym, co sprawdziliśmy na własnej skórze.',
};
