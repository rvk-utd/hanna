export const colorThemes = {
  trustworthy: 'trustworthy',
  dependable: 'dependable',
  friendly: 'friendly',
  lively: 'lively',
  colorful: 'colorful',
} as const;

export type HannaColorTheme = keyof typeof colorThemes;
