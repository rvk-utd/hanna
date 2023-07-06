// See <file://./_WAT.md> for info on why this file exists

import * as _pkg from 'react-dropzone';

// This defensive code is required to get around the fact that react-dropzone
// mixes default and named exports.
// Depending whether this module is run as ESM or CJS, then `_default` may be
// either the actual default export or an object with a default property.
// Rejoice in the woeful borderlands of modern ESM and legacy CJS interop.
const reactDropzonePkg =
  'default' in _pkg.default ? (_pkg.default as unknown as typeof _pkg) : _pkg;

export const ReactDropzone = reactDropzonePkg.default;
export const useDropzone = reactDropzonePkg.useDropzone;
