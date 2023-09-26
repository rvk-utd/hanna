import { reportKeyMismatch } from 'hanna-test-helpers/ospec';
import o from 'ospec';

import * as lib from './i18n.js';
import { DEFAULT_LANG, getTexts, setDefaultLanguage } from './i18n.js';

type ExpectedExports = keyof typeof lib;

o.spec('hanna-utils/i18n', () => {
  o('exports the correct tokens', () => {
    const expectedTokens: Record<ExpectedExports, true> = {
      // i18n.ts
      getTexts: true,
      DEFAULT_LANG: true,
      setDefaultLanguage: true,
    };

    reportKeyMismatch(lib, expectedTokens);
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts, import/first, simple-import-sort/imports */
// Also check exported types. (Ignoring re-exported types from es-in-css.)
import type {
  // i18n.ts
  DefaultTexts,
  HannaLang,
} from './i18n.js';
import { Equals, Expect } from './_/testing.js';
/* eslint-enable @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts, import/first, simple-import-sort/imports */

// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------

o.spec('getTexts and setDefaultLanguage', () => {
  // …
  const defaultTexts: DefaultTexts<{ a: string }> = {
    is: { a: 'Opna' },
    en: { a: 'Open' },
    pl: { a: 'Otwórz' },
  };

  o('works', () => {
    const texts = { a: 'Foo' };

    o(getTexts({ texts }, defaultTexts)).equals(texts)('prefers `text` property');
    o(getTexts({}, defaultTexts)).equals(defaultTexts.is)("The default language is 'is'");
    o(getTexts({ lang: 'en' }, defaultTexts)).equals(defaultTexts.en)(
      '`lang` prop controls the selection from `defaultTexts`'
    );
    o(getTexts({ texts, lang: 'en' }, defaultTexts)).equals(texts)(
      '`texts` prop trumps the `lang` prop'
    );
    o(getTexts({ lang: 'xx' as string }, defaultTexts)).equals(defaultTexts.is)(
      'Unknown `lang` returns the default language tests'
    );

    o(DEFAULT_LANG).equals('is')('`DEFAULT_LANG` is `is` by default');
    setDefaultLanguage('pl');
    // @ts-expect-error  (Testing invalid input)
    const invalidLang: HannaLang = 'xx';
    setDefaultLanguage(invalidLang);
    o(DEFAULT_LANG).equals('en')('Invalid language falls back to the base language');

    setDefaultLanguage('pl');
    o(DEFAULT_LANG).equals('pl')('`setDefaultLanguage` changes the default language');
    o(getTexts({ lang: 'xx' as string }, defaultTexts)).equals(defaultTexts.pl)(
      '`getTexts` uses `DEFAULT_LANG`'
    );

    setDefaultLanguage(undefined);
    o(DEFAULT_LANG).equals('is')(
      'passing undefined to `setDefaultLanguage` sets it to the base language'
    );
    setDefaultLanguage('pl');
    setDefaultLanguage('en');
    setDefaultLanguage.pop();
    o(DEFAULT_LANG).equals('is')('`.pop()`ing an empty stack sets the base language');

    setDefaultLanguage.push('pl');
    setDefaultLanguage.push('en');
    setDefaultLanguage.pop();
    o(DEFAULT_LANG).equals('pl')('`.pop()` restores the previous language');
    setDefaultLanguage.pop();
    setDefaultLanguage.pop();
    setDefaultLanguage.pop();
    setDefaultLanguage.pop();
    o(DEFAULT_LANG).equals('is')('excessive `.pop()`ing settles on the base language');
  });
});
