//@ts-check
/* eslint-env es2022 */
import { $, logError, opts } from '../../build-helpers.mjs';

import { serverFolder } from './build/config.mjs';
import { buildCssFiles } from './build/helpers.mjs';

// ===========================================================================

await import('./build-lib.mjs');
await buildCssFiles(process.env.NODE_ENV);

if (opts.dev) {
  $(`yarn run gulp --gulpfile build/gulp-tasks.mjs --cwd . watch`).catch(logError);
  $(`cd ${serverFolder} && sh scripts/start-dev.sh`).catch(logError);
}
