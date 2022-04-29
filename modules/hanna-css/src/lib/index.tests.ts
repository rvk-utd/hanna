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
  type CSSVarToken = keyof typeof cssVars;
  const expectedTokens: Record<CSSVarToken, true> = {
    bp_w_phone: true,
    bp_w_phablet: true,
    bp_w_tablet: true,
    bp_w_netbook: true,
    bp_w_wide: true,
    bp_w_Hamburger: true,
    cssVersion: true,
  };

  o('exposes known CSS variable tokens', () => {
    Object.keys(expectedTokens).forEach((token) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (cssVars[token as CSSVarToken] === undefined) {
        o(token).equals('true')(`missing: "${token}"`);
      }
    });
    Object.keys(cssVars).forEach((token) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (expectedTokens[token as CSSVarToken] === undefined) {
        o(token).equals('true')(`extra: "${token}"`);
      }
    });
  });
});

// ---------------------------------------------------------------------------
// Ensure expected types as exported
// (Skip checking for all the types re-exported from es-in-css)

/* eslint-disable @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts, import/first */
import type { RawCssString, RawCssVarString } from './index';
/* eslint-enisable @typescript-eslint/no-unused-vars, unused-imports/no-unused-imports-ts */
