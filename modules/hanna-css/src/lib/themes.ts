/**
 * The names of the Hanna color themes.
 */
export type HannaColorTheme =
  | 'trustworthy'
  | 'dependable'
  | 'friendly'
  | 'lively'
  | 'colorful';

/**
 * Object containing the names of the Hanna color themes.
 */
export const colorThemes: Readonly<Record<HannaColorTheme, HannaColorTheme>> = {
  trustworthy: 'trustworthy',
  dependable: 'dependable',
  friendly: 'friendly',
  lively: 'lively',
  colorful: 'colorful',
};
