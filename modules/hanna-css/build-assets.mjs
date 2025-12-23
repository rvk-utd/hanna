//@ts-check
import { shell$ } from '@maranomynet/libtools';

import { assetsDistFolder } from './build/config.mjs';
import { compressStaticAssets } from './build/gulp-tasks.mjs';
import { handlError } from './build/helpers.mjs';

// ===========================================================================

(async () => {
  await shell$(`rm -rf ${assetsDistFolder}`);
  await compressStaticAssets().catch(handlError);
})();
