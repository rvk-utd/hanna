import * as esincss from 'es-in-css';
import { reportMismatch } from 'hanna-test-helpers/ospec';
import o from 'ospec';

import * as lib from './index';

type ExpectedExports = Exclude<keyof typeof lib, keyof typeof esincss>;

o.spec('hanna-css lib', () => {
  o('exports the correct tokens', () => {
    const expectedTokens: Record<ExpectedExports, true> = {
      /* ObjectHelpers.ts */
      ObjectEntries: true,
      ObjectFromEntries: true,
      ObjectKeys: true,

      /* focusElement.ts */
      focusElement: true,

      /* formatMonitor.ts */
      formatMonitor: true,

      /* getPageScrollElm.ts */
      getPageScrollElm: true,

      /* getSVGtext.ts */
      getSVGtext: true,

      /* getStableRandomItem.ts */
      getStableRandomItem: true,

      /* misc.ts */
      notNully: true,
      capitalize: true,

      /* printDate.ts */
      printDate: true,

      /* types.d.ts */
    };

    reportMismatch(
      lib,
      expectedTokens,
      // Ignoring re-exported tokens from es-in-css.
      esincss
    );
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts, import/first, simple-import-sort/imports */
// Also check exported types. (Ignoring re-exported types from es-in-css.)
import type {
  /* ObjectEntries.ts */

  /* focusElement.ts */

  /* formatMonitor.ts */
  MediaFormat,

  /* getPageScrollElm.ts */

  /* getSVGtext.ts */

  /* getStableRandomItem.ts */

  /* misc.ts */

  /* printDate.ts */

  /* types.d.ts */
  OpenRecord,
  OpenStringMap,
  Resolve,
  AllowKeys,
  EitherObj,
  // PickRequired,
  // PickOptional,
  // PickIndexed,
  // RequiredKeys,
  // OptionalKeys,
} from './index';
import { tree } from 'gulp';
/* eslint-enable @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts, import/first, simple-import-sort/imports */
