export const colors = {
  esja_25: '#f4f7ff' as string, // esja_50 mixed with white
  esja_50: '#e8eeff' as string,
  esja_75: '#d2ddfe' as string,
  esja_100: '#a5bbfd' as string,
  esja_150: '#525e7f' as string,

  faxafloi_25: '#e0eefb' as string, // faxafloi_50 mixed with white
  faxafloi_50: '#c0ddf7' as string,
  faxafloi_75: '#81bbf0' as string,
  faxafloi_100: '#0367e1' as string,
  faxafloi_150: '#013b70' as string,

  nautholsvik_25: '#fffaea' as string, // nautholsvik_50 mixed with white
  nautholsvik_50: '#fff5d5' as string,
  nautholsvik_75: '#ffeaac' as string,
  nautholsvik_100: '#ffd659' as string,
  nautholsvik_150: '#806b2c' as string,

  heidmork_25: '#fae4e5' as string, // heidmork_50 mixed with white
  heidmork_50: '#f5c8cb' as string,
  heidmork_75: '#ec9197' as string,
  heidmork_100: '#d8222f' as string,
  heidmork_150: '#6c1118' as string,

  ellidaardalur_25: '#e2f9ea' as string, // ellidaardalur_50 mixed with white
  ellidaardalur_50: '#c4f2d5' as string,
  ellidaardalur_75: '#89e6ab' as string,
  ellidaardalur_100: '#64d68e' as string,
  ellidaardalur_150: '#0a662b' as string,

  blafjoll_25: '#ffede9' as string, // blafjoll_50 mixed with white
  blafjoll_50: '#ffdbd3' as string,
  blafjoll_75: '#fab7a9' as string,
  blafjoll_100: '#f77257' as string,
  blafjoll_150: '#805737' as string,

  sund_25: '#eafbff' as string, // sund_50 mixed with white
  sund_50: '#d4f6ff' as string,
  sund_75: '#a9edff' as string,
  sund_100: '#53daff' as string,
  sund_150: '#296d80' as string,

  rokkur_25: '#fff1f6' as string, // rokkur_50 mixed with white
  rokkur_50: '#ffe3ec' as string,
  rokkur_75: '#ffc6da' as string,
  rokkur_100: '#ff8db5' as string,
  rokkur_150: '#80475a' as string,

  suld_0: '#ffffff' as string,
  suld_25: '#f8f8f9' as string,
  suld_50: '#f1f2f3' as string,
  suld_75: '#e3e5e7' as string,
  suld_100: '#c7cbd0' as string,
  suld_150: '#707275' as string,
  suld_200: '#2a2b2c' as string,

  white: '#ffffff', // colors.suld_0;
  blackish: '#2a2b2c', // colors.suld_200;
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
