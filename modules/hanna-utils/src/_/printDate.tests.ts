import o from 'ospec';

import { printDate } from './printDate';

o.spec('printDate', () => {
  const june17_2022_iso = '2022-06-17T12:34:56';
  const june17_2022 = new Date(june17_2022_iso);

  o('works for Dates', () => {
    o(printDate(june17_2022, 'is')).equals('17. júní 2022')('Icelandic');
    o(printDate(june17_2022, 'en')).equals('June 17, 2022')('English');
    o(printDate(june17_2022, 'pl')).equals('17. czerwca 2022')('Polish');
    o(printDate(june17_2022_iso, 'en')).equals('June 17, 2022')(
      'iso date string to English'
    );
  });

  o('Defaults to Icelandic', () => {
    o(printDate(june17_2022)).equals('17. júní 2022')('no language');
    o(printDate(june17_2022, 'jp')).equals('17. júní 2022')('invalid language');
  });
});
