/* eslint-disable import/newline-after-import, import/first, simple-import-sort/imports */

import { ObjectEntries, getFormatMonitor } from '@reykjavik/hanna-utils';
export { getFormatMonitor, ObjectEntries };

// ---------------------------------------------------------------------------
import { getTexts } from '@reykjavik/hanna-utils/i18n';
export const foo = getTexts(
  {},
  { is: { foo: 'Krá' }, en: { foo: 'Bar' }, pl: { foo: 'Bar' } }
);

// ---------------------------------------------------------------------------
import { getAssetUrl } from '@reykjavik/hanna-utils/assets';
export { getAssetUrl };

// ---------------------------------------------------------------------------
import { buildVariables, px } from '@reykjavik/hanna-css';
export { px };

// ---------------------------------------------------------------------------
export const answer = 43;

// ===========================================================================

// const buildVariables = (foo: Array<string>) => {
//   return { vars: foo, override: 'asdfasdff' };
// };
// buildVariables.join = (...foo: Array<any>) => {
//   return { vars: foo, override: 'asdfasdff' };
// };

export const envVars = /*@__PURE__*/ buildVariables([
  'cssVersion',
  'browser_scrollbar_width',
]);
// export const iconVars = /*@__PURE__*/ buildVariables([]);
// const _hannaVars = /*@__PURE__*/ buildVariables.join(envVars, iconVars);
// export const hannaVars = /*#__PURE__*/ _hannaVars.vars;
// export const hannaVarOverride = /*#__PURE__*/ _hannaVars.override;
