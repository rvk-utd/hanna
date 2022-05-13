import * as esincss from 'es-in-css';
import o from 'ospec';

import * as lib from './index';
import { compareKeys } from './test-utils';

type ExpectedExports = Exclude<keyof typeof lib, keyof typeof esincss>;

o.spec('hanna-css lib', () => {
  o('exports the correct tokens', () => {
    const expectedTokens: Record<ExpectedExports, true> = {
      /* breakpints.ts */
      mq: true,
      breakpoints_raw: true,

      /* colors.ts */
      colors_raw: true,

      /* cssutils.ts */
      buildVariables: true,
      isDevMode: true,

      /* hannavars.ts */
      hannaVars: true,
      hannaVarOverride: true,

      /* fonts.ts */
      font_raw: true,

      /* grid.ts */
      grid_raw: true,

      /* icons.ts */
      iconStyle: true,
      characters: true,
      iconfont_raw: true,

      /* themes.ts */
      colorThemes: true,

      /* WARNING__.ts */
      WARNING__: true,
      WARNING_message__: true,
      // suppress_WARNING__: true,
      WARNING_soft__: true,
      // suppress_WARNING_soft__: true,
    };

    compareKeys(
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
  // colors.ts
  HannaColorTheme,

  // cssvars.ts
  HannaCssVarToken,
} from './index';
/* eslint-enable @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts, import/first, simple-import-sort/imports */
