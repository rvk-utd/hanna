import { reportKeyMismatch } from 'hanna-test-helpers/ospec';
import o from 'ospec';

import * as lib from './i18n.js';
import { getTexts } from './i18n.js';

type ExpectedExports = keyof typeof lib;

o.spec('hanna-utils/i18n', () => {
  o('exports the correct tokens', () => {
    const expectedTokens: Record<ExpectedExports, true> = {
      // i18n.ts
      getTexts: true,
      DEFAULT_LANG: true,
    };

    reportKeyMismatch(lib, expectedTokens);
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts, import/first, simple-import-sort/imports */
// Also check exported types. (Ignoring re-exported types from es-in-css.)
import type {
  // i18n.ts
  DefaultTexts,
} from './i18n.js';
import { Equals, Expect } from './_/testing.js';
/* eslint-enable @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts, import/first, simple-import-sort/imports */

// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------

o.spec('getTexts', () => {
  // …
  const defaultTexts = {
    is: { a: 'Opna' },
    en: { a: 'Open' },
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
  });
});
