import { color } from 'es-in-css';

const pureWhite = color('#fff');

export const colors = {
  esja_25: color('#e8eeff').mix(pureWhite),
  esja_50: color('#e8eeff'),
  esja_75: color('#d2ddfe'),
  esja_100: color('#a5bbfd'),
  esja_150: color('#525e7f'),

  faxafloi_25: color('#c0ddf7').mix(pureWhite),
  faxafloi_50: color('#c0ddf7'),
  faxafloi_75: color('#81bbf0'),
  faxafloi_100: color('#0367e1'),
  faxafloi_150: color('#013b70'),

  nautholsvik_25: color('#fff5d5').mix(pureWhite),
  nautholsvik_50: color('#fff5d5'),
  nautholsvik_75: color('#ffeaac'),
  nautholsvik_100: color('#ffd659'),
  nautholsvik_150: color('#806b2c'),

  heidmork_25: color('#f5c8cb').mix(pureWhite),
  heidmork_50: color('#f5c8cb'),
  heidmork_75: color('#ec9197'),
  heidmork_100: color('#d8222f'),
  heidmork_150: color('#6c1118'),

  ellidaardalur_25: color('#c4f2d5').mix(pureWhite),
  ellidaardalur_50: color('#c4f2d5'),
  ellidaardalur_75: color('#89e6ab'),
  ellidaardalur_100: color('#64d68e'),
  ellidaardalur_150: color('#0a662b'),

  blafjoll_25: color('#ffdbd3').mix(pureWhite),
  blafjoll_50: color('#ffdbd3'),
  blafjoll_75: color('#fab7a9'),
  blafjoll_100: color('#f77257'),
  blafjoll_150: color('#805737'),

  sund_25: color('#d4f6ff').mix(pureWhite),
  sund_50: color('#d4f6ff'),
  sund_75: color('#a9edff'),
  sund_100: color('#53daff'),
  sund_150: color('#296d80'),

  rokkur_25: color('#ffe3ec').mix(pureWhite),
  rokkur_50: color('#ffe3ec'),
  rokkur_75: color('#ffc6da'),
  rokkur_100: color('#ff8db5'),
  rokkur_150: color('#80475a'),

  suld_0: color('#ffffff'),
  suld_25: color('#f8f8f9'),
  suld_50: color('#f1f2f3'),
  suld_75: color('#e3e5e7'),
  suld_100: color('#c7cbd0'),
  suld_150: color('#707275'),
  suld_200: color('#2a2b2c'),

  white: color('#ffffff'), // colors.suld_0;
  blackish: color('#2a2b2c'), // colors.suld_200;
} as const;

// ---------------------------------------------------------------------------

/**
 * The Hanna base color family nanmes.
 */
export type ColorFamily =
  | 'esja'
  | 'faxafloi'
  | 'nautholsvik'
  | 'heidmork'
  | 'ellidaardalur'
  | 'blafjoll'
  | 'sund'
  | 'rokkur'
  | 'suld';

/**
 * Object containing the names of the Hanna base color families.
 */
export const colorFamilies: Readonly<Record<ColorFamily, ColorFamily>> = {
  esja: 'esja',
  faxafloi: 'faxafloi',
  nautholsvik: 'nautholsvik',
  heidmork: 'heidmork',
  ellidaardalur: 'ellidaardalur',
  blafjoll: 'blafjoll',
  sund: 'sund',
  rokkur: 'rokkur',
  suld: 'suld',
};
