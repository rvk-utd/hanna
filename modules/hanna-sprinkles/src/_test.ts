/* eslint-disable import/newline-after-import, unused-imports/no-unused-imports-ts, @typescript-eslint/no-unused-vars, import/first, simple-import-sort/imports */

import './utils/focus-visible.js';

// ---------------------------------------------------------------------------
import { ObjectEntries, getFormatMonitor } from '@reykjavik/hanna-utils';
export { getFormatMonitor, ObjectEntries };

// ---------------------------------------------------------------------------
import { getTexts } from '@reykjavik/hanna-utils/i18n';
export const foo = getTexts({}, { is: { foo: 'bar' } });

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
