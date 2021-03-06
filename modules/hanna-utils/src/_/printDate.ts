import { OpenRecord } from './types';

const monthsByLang: OpenRecord<'is' | 'en' | 'pl', Array<string>> = {
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
 * Very simple, very stupid, standalone date formatter for Icelandic, English and Polish.
 *
 * Just prints the full date (day, month, year).
 */
export const printDate = (date: string | Date, lang?: string): string => {
  date = typeof date === 'string' ? new Date(date) : date;
  const d = date.getUTCDate();
  const months = monthsByLang[lang || ''] || monthsByLang.en;
  const mmm = months[date.getUTCMonth()];
  const yyyy = date.getUTCFullYear();
  return months === monthsByLang.en ? `${mmm} ${d}, ${yyyy}` : `${d}. ${mmm} ${yyyy}`;
};
