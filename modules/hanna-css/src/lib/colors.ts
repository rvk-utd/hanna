import { color, css } from 'es-in-css';

import { buildVariables } from './cssutils';

const pureWhite = color('#fff');

export const colors_raw = {
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

  white: color('white'),
  blackish: color('black'),
};
colors_raw.white = colors_raw.suld_0;
colors_raw.blackish = colors_raw.suld_200;

// ---------------------------------------------------------------------------

export const colorVars = buildVariables([
  'color_esja_25',
  'color_esja_50',
  'color_esja_75',
  'color_esja_100',
  'color_esja_150',

  'color_faxafloi_25',
  'color_faxafloi_50',
  'color_faxafloi_75',
  'color_faxafloi_100',
  'color_faxafloi_150',

  'color_nautholsvik_25',
  'color_nautholsvik_50',
  'color_nautholsvik_75',
  'color_nautholsvik_100',
  'color_nautholsvik_150',

  'color_heidmork_25',
  'color_heidmork_50',
  'color_heidmork_75',
  'color_heidmork_100',
  'color_heidmork_150',

  'color_ellidaardalur_25',
  'color_ellidaardalur_50',
  'color_ellidaardalur_75',
  'color_ellidaardalur_100',
  'color_ellidaardalur_150',

  'color_blafjoll_25',
  'color_blafjoll_50',
  'color_blafjoll_75',
  'color_blafjoll_100',
  'color_blafjoll_150',

  'color_sund_25',
  'color_sund_50',
  'color_sund_75',
  'color_sund_100',
  'color_sund_150',

  'color_rokkur_25',
  'color_rokkur_50',
  'color_rokkur_75',
  'color_rokkur_100',
  'color_rokkur_150',

  'color_suld_0',
  'color_suld_25',
  'color_suld_50',
  'color_suld_75',
  'color_suld_100',
  'color_suld_150',
  'color_suld_200',

  'color_white',
  'color_blackish',
]);
const _c = colorVars.vars;

export const colorVarDeclarations =
  colorVars.declare({
    color_esja_25: colors_raw.esja_25,
    color_esja_50: colors_raw.esja_50,
    color_esja_75: colors_raw.esja_75,
    color_esja_100: colors_raw.esja_100,
    color_esja_150: colors_raw.esja_150,

    color_faxafloi_25: colors_raw.faxafloi_25,
    color_faxafloi_50: colors_raw.faxafloi_50,
    color_faxafloi_75: colors_raw.faxafloi_75,
    color_faxafloi_100: colors_raw.faxafloi_100,
    color_faxafloi_150: colors_raw.faxafloi_150,

    color_nautholsvik_25: colors_raw.nautholsvik_25,
    color_nautholsvik_50: colors_raw.nautholsvik_50,
    color_nautholsvik_75: colors_raw.nautholsvik_75,
    color_nautholsvik_100: colors_raw.nautholsvik_100,
    color_nautholsvik_150: colors_raw.nautholsvik_150,

    color_heidmork_25: colors_raw.heidmork_25,
    color_heidmork_50: colors_raw.heidmork_50,
    color_heidmork_75: colors_raw.heidmork_75,
    color_heidmork_100: colors_raw.heidmork_100,
    color_heidmork_150: colors_raw.heidmork_150,

    color_ellidaardalur_25: colors_raw.ellidaardalur_25,
    color_ellidaardalur_50: colors_raw.ellidaardalur_50,
    color_ellidaardalur_75: colors_raw.ellidaardalur_75,
    color_ellidaardalur_100: colors_raw.ellidaardalur_100,
    color_ellidaardalur_150: colors_raw.ellidaardalur_150,

    color_blafjoll_25: colors_raw.blafjoll_25,
    color_blafjoll_50: colors_raw.blafjoll_50,
    color_blafjoll_75: colors_raw.blafjoll_75,
    color_blafjoll_100: colors_raw.blafjoll_100,
    color_blafjoll_150: colors_raw.blafjoll_150,

    color_sund_25: colors_raw.sund_25,
    color_sund_50: colors_raw.sund_50,
    color_sund_75: colors_raw.sund_75,
    color_sund_100: colors_raw.sund_100,
    color_sund_150: colors_raw.sund_150,

    color_rokkur_25: colors_raw.rokkur_25,
    color_rokkur_50: colors_raw.rokkur_50,
    color_rokkur_75: colors_raw.rokkur_75,
    color_rokkur_100: colors_raw.rokkur_100,
    color_rokkur_150: colors_raw.rokkur_150,

    color_suld_0: colors_raw.suld_0,
    color_suld_25: colors_raw.suld_25,
    color_suld_50: colors_raw.suld_50,
    color_suld_75: colors_raw.suld_75,
    color_suld_100: colors_raw.suld_100,
    color_suld_150: colors_raw.suld_150,
    color_suld_200: colors_raw.suld_200,

    color_white: colors_raw.white,
    color_blackish: colors_raw.blackish,
  }) +
  css`
  // @deprecated This was a typo (Will be removed in version v0.9)
  --color-ellidarardalur-25: ${_c.color_ellidaardalur_25},
  --color-ellidarardalur-50: ${_c.color_ellidaardalur_50},
  --color-ellidarardalur-75: ${_c.color_ellidaardalur_75},
  --color-ellidarardalur-100: ${_c.color_ellidaardalur_100},
  --color-ellidarardalur-150: ${_c.color_ellidaardalur_150},
`;
