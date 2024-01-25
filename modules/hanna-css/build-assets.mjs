//@ts-check
/* eslint-env es2022 */

import { $ } from '../../build-helpers.mjs';

import { assetsDistFolder } from './build/config.mjs';
import { compressStaticAssets } from './build/gulp-tasks.mjs';
import { handlError } from './build/helpers.mjs';

// ===========================================================================

await $(`rm -rf ${assetsDistFolder}`);
await compressStaticAssets().catch(handlError);
