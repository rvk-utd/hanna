import { reportKeyMismatch } from 'hanna-test-helpers/ospec';
import o from 'ospec';

import * as lib from './assets';

type ExpectedExports = keyof typeof lib;

o.spec('hanna-utils/assets', () => {
  o('exports the correct tokens', () => {
    const expectedTokens: Record<ExpectedExports, true> = {
      blingTypes: true,
      getBlingUrl: true,

      efnistakn: true,
      getEfnistaknUrl: true,

      formheimur: true,
      getFormheimurUrl: true,

      illustrations: true,
      getIllustrationUrl: true,

      getAssetUrl: true,

      setStyleServerUrl: true,
      styleServerUrl: true,
    };

    reportKeyMismatch(lib, expectedTokens);
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts, import/first, simple-import-sort/imports */
// Also check exported types. (Ignoring re-exported types from es-in-css.)
import type {
  // assets.ts
  BlingType,
  Efnistakn,
  Formheimur,
  Illustration,
} from './assets';
/* eslint-enable @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts, import/first, simple-import-sort/imports */
