import { reportKeyMismatch } from 'hanna-test-helpers/ospec.js';
import o from 'ospec';

import * as lib from './scale.js';

type ExpectedExports = keyof typeof lib;

o.spec('hanna-css/scale lib', () => {
  o('exports the correct tokens', () => {
    const expectedTokens: Record<ExpectedExports, true> = {
      // between.ts
      scale: true,

      scale_cols: true,
      scale_container: true,

      scale_phone: true,
      scale_phablet: true,
      scale_tablet: true,
      scale_netbook: true,
      scale_phone_netbook: true,
      scale_phablet_netbook: true,
      scale_tablet_netbook: true,
      scale_phone_tablet: true,
      scale_phablet_tablet: true,
      scale_phone_phablet: true,
      scale_Hamburger: true,
      scale_Topmenu: true,

      clamp_phone: true,
      clamp_phablet: true,
      clamp_tablet: true,
      clamp_netbook: true,
      clamp_phone_netbook: true,
      clamp_phablet_netbook: true,
      clamp_tablet_netbook: true,
      clamp_phone_tablet: true,
      clamp_phablet_tablet: true,
      clamp_phone_phablet: true,
      clamp_Hamburger: true,
      clamp_Topmenu: true,
    };

    reportKeyMismatch(lib, expectedTokens);
  });
});

/* eslint-disable @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts, import/first, simple-import-sort/imports */
// Also check exported types. (Ignoring re-exported types from es-in-css.)
import type {
  // between.ts
  ScaleEdge,
} from './scale.js';
/* eslint-enable @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts, import/first, simple-import-sort/imports */
