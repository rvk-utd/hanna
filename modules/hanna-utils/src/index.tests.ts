import { reportKeyMismatch } from 'hanna-test-helpers/ospec';
import o from 'ospec';

import * as lib from './index';

type ExpectedExports = keyof typeof lib;

o.spec('hanna-utils lib', () => {
  o('exports the correct tokens', () => {
    const expectedTokens: Record<ExpectedExports, true> = {
      /* ObjectHelpers.ts */
      ObjectEntries: true,
      ObjectFromEntries: true,
      ObjectKeys: true,

      /* ensure.ts */
      ensurePosInt: true,

      /* focusElement.ts */
      focusElement: true,

      /* formatMonitor.ts */
      getFormatMonitor: true,

      /* getPageScrollElm.ts */
      getPageScrollElm: true,

      /* getSVGtext.ts */
      getSVGtext: true,

      /* getStableRandomItem.ts */
      getStableRandomItem: true,

      /* misc.ts */
      notNully: true,
      notFalsy: true,
      capitalize: true,

      /* printDate.ts */
      printDate: true,

      /* types.d.ts */
    };

    reportKeyMismatch(lib, expectedTokens);
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts, import/first, simple-import-sort/imports */
// Also check exported types. (Ignoring re-exported types from es-in-css.)
import type {
  /* ObjectHelpers.ts */

  /* ensure.ts */
  PositiveInteger,

  /* focusElement.ts */

  /* formatMonitor.ts */
  MediaFormat,

  /* getPageScrollElm.ts */

  /* getSVGtext.ts */

  /* getStableRandomItem.ts */

  /* misc.ts */
  Falsy,

  /* printDate.ts */

  /* testing.d.ts */
  Expect,
  Equals,
  Extends,
  NotExtends,

  /* types.d.ts */
  OpenRecord,
  OpenStringMap,
  Resolve,
  Cleanup,
  AllowKeys,
  EitherObj,
  // PickRequired,
  // PickOptional,
  // PickIndexed,
  // RequiredKeys,
  // OptionalKeys,
} from './index';
/* eslint-enable @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts, import/first, simple-import-sort/imports */
