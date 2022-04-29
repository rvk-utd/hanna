import { px } from 'es-in-css';
import o from 'ospec';

import { cssVars, makeVariables } from './index';

o.spec('makeVariables helper', () => {
  o('works', () => {
    o(makeVariables({ foo: px(2) }).vars.foo()).equals('var(--foo)');
    o(makeVariables({ a$b_c: px(2) }).vars.a$b_c()).equals('var(--a_b-c)')(
      'maps "_" to "\'" and "$" to "_"'
    );
  });
});

o.spec('cssVars', () => {
  const expectedTokens = [
    'bp_w_phone',
    'bp_w_phablet',
    'bp_w_tablet',
    'bp_w_netbook',
    'bp_w_wide',
    'bp_w_Hamburger',
  ];

  o('exposes known CSS variable tokens', () => {
    expectedTokens.forEach((token) => {
      o(token in cssVars).equals(true)(`including "${token}"`);
    });
    o(Object.keys(cssVars).length).equals(expectedTokens.length)(
      'number of variable tokens is correct'
    );
  });
});

// ---------------------------------------------------------------------------
// Ensure expected types as exported
// (Skip checking for all the types re-exported from es-in-css)

/* eslint-disable @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts, import/first */
import type { RawCssString, RawCssVarString } from './index';
/* eslint-enisable @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts */
