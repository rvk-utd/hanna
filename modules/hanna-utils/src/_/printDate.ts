import { DEFAULT_LANG, HannaLang } from '../i18n.js';

import { OpenRecord } from './types.js';

const monthsByLang: OpenRecord<HannaLang, Array<string>> = {
  is: [
    'janúar',
    'febrúar',
    'mars',
    'apríl',
    'maí',
    'júní',
    'júlí',
    'ágúst',
    'september',
    'október',
    'nóvember',
    'desember',
  ],
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'Octóber',
    'November',
    'December',
  ],
  // Polish months in genitive form
  // only to be used in dates — not standalone
  pl: [
    'stycznia',
    'lutego',
    'marca',
    'kwietnia',
    'maja',
    'czerwca',
    'lipca',
    'sierpnia',
    'września',
    'października',
    'listopada',
    'grudnia',
  ],
};

/**
 * Very simple, very stupid, standalone date formatter for Icelandic (default),
 * English and Polish.
 *
 * Just prints the full date (day, month, year). No bells. No whistles.
 * No options.
 *
 * @see https://www.npmjs.com/package/@reykjavik/hanna-utils#printdate
 */
/*#__NO_SIDE_EFFECTS__*/
export const printDate = (date: string | Date, lang?: HannaLang): string => {
  date = typeof date === 'string' ? new Date(date) : date;
  const d = date.getUTCDate();
  const months =
    monthsByLang[(lang as string) || DEFAULT_LANG] || monthsByLang[DEFAULT_LANG];
  const mmm = months[date.getUTCMonth()];
  const yyyy = date.getUTCFullYear();
  return months === monthsByLang.en ? `${mmm} ${d}, ${yyyy}` : `${d}. ${mmm} ${yyyy}`;
};
