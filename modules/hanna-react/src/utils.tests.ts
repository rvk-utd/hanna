import { reportKeyMismatch } from 'hanna-test-helpers/ospec';
import o from 'ospec';

import * as lib from './utils';

type ExpectedExports = keyof typeof lib;

o.spec('hanna-react/utils lib', () => {
  o('exports the correct tokens', () => {
    const expectedTokens: Record<ExpectedExports, true> = {
      /* utils/config.ts */
      setLinkRenderer: true,

      /* utils/useDidChange.ts */
      useDidChange: true,

      /* utils/useFormatMonitor.ts */
      useFormatMonitor: true,

      /* utils/useGetSVGtext.ts */
      useGetSVGtext: true,

      /* utils/useMixedControlState.ts */
      useMixedControlState: true,

      /* utils/useScrollbarWidthCSSVar.ts */
      useScrollbarWidthCSSVar: true,
    };

    reportKeyMismatch(lib, expectedTokens);
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts, import/first, simple-import-sort/imports */
// Also check exported types. (Ignoring re-exported types from es-in-css.)
import type {
  /* utils/config.ts */
  LinkRenderer,

  /* utils/useDidChange.ts */

  /* utils/useFormatMonitor.ts */

  /* utils/useGetSVGtext.ts */

  /* utils/useMixedControlState.ts */

  /* utils/useScrollbarWidthCSSVar.ts */
} from './utils';
/* eslint-enable @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts, import/first, simple-import-sort/imports */
