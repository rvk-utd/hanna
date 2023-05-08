import { reportKeyMismatch } from 'hanna-test-helpers/ospec';
import o from 'ospec';

import * as lib from './shareButtonsUtils.js';

type ExpectedExports = keyof typeof lib;

o.spec('hanna-utils/shareButtonsUtils', () => {
  o('exports the correct tokens', () => {
    const expectedTokens: Record<ExpectedExports, true> = {
      getDocMeta: true,
      getShareButtonLabel: true,
      openInPopup: true,
      shareButtonTexts: true,
      shareButtonTypes: true,
    };

    reportKeyMismatch(lib, expectedTokens);
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts, import/first, simple-import-sort/imports */
// Also check exported types. (Ignoring re-exported types from es-in-css.)
import type {
  // assets.ts
  DocMeta,
  ShareButtonI18n,
  ShareButtonPlatforms,
} from './shareButtonsUtils.js';
/* eslint-enable @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts, import/first, simple-import-sort/imports */
