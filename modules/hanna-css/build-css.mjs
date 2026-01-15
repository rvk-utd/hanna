//@ts-check
import { logError, shell$ } from '@maranomynet/libtools';

import { isDev } from '../../build-helpers.mjs';

import { serverFolder } from './build/config.mjs';
import { buildCssFiles } from './build/helpers.mjs';

// ===========================================================================

await import('./build-lib.mjs');
await buildCssFiles(process.env.NODE_ENV);

if (isDev) {
  shell$(`yarn run gulp --gulpfile build/gulp-tasks.mjs --cwd . watch`, logError);
  shell$(`cd ${serverFolder} && sh scripts/start-dev.sh`, logError);
}
