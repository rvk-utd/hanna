export const colorThemes = [
  'trustworthy',
  'dependable',
  'friendly',
  'lively',
  'colorful',
] as const;

export type HannaColorTheme = typeof colorThemes[number];
