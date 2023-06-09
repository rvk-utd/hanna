// See <file://./_WAT.md> for info on why this file exists

import * as reactDropzonePkg from 'react-datepicker'; // Docs: https://reactdatepicker.com/

const _default = reactDropzonePkg.default;

// This defensive code is required to get around the fact that react-dropzone
// mixes default and named exports.
// Depending whether this module is run as ESM or CJS, then `_default` may be
// either the actual default export or an object with a default property.
// Rejoice in the woeful borderlands of modern ESM and legacy CJS interop.
export const ReactDatePicker =
  'default' in _default ? (_default.default as typeof _default) : _default;

export const registerLocale = reactDropzonePkg.registerLocale;
export const setDefaultLocale = reactDropzonePkg.setDefaultLocale;
export const getDefaultLocale = reactDropzonePkg.getDefaultLocale;
export const CalendarContainer = reactDropzonePkg.CalendarContainer;
