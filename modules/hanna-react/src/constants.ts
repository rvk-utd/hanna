import { colorFamilies as _colorFamilies, colorThemes } from '@reykjavik/hanna-css';
import { EitherObj } from '@reykjavik/hanna-utils';

/** @depcrecated import `colorFamilies` from  `@reykjavik/hanna-css` instead  (Will be removed in v0.11) */
export const colorFamilies = Object.assign(
  [
    'esja',
    'faxafloi',
    'nautholsvik',
    'heidmork',
    'ellidaardalur',
    'blafjoll',
    'sund',
    'rokkur',
    'suld',
  ] as const,
  _colorFamilies,
  {
    /** @deprecated  This is a typo  (Will be removed in v0.11) */
    ellidarardalur: 'ellidaardalur',
  }
);

/** @depcrecated import type `ColorFamily` from `@reykjavik/hanna-css` instead  (Will be removed in v0.11) */
export type { ColorFamily } from '@reykjavik/hanna-css';

/** @depcrecated import `colorThemes` from  `@reykjavik/hanna-css` instead  (Will be removed in v0.11) */
export const themeOptions = Object.assign(
  ['trustworthy', 'dependable', 'friendly', 'lively', 'colorful'] as const,
  colorThemes
);

/** @depcrecated import type `HannaColorTheme` from `@reykjavik/hanna-css` instead  (Will be removed in v0.11) */
export type { HannaColorTheme as ThemeOption } from '@reykjavik/hanna-css';

// ---------------------------------------------------------------------------

export type Alignment = 'right' | 'left';
export const aligns: Record<string, true | undefined> = {
  right: true,
  left: true,
};

// ---------------------------------------------------------------------------

export type ComponentLayoutProps<Align extends string = 'right'> = EitherObj<
  { wide?: boolean },
  { align?: Align }
>;
