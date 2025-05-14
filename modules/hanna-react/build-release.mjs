//@ts-check
/* eslint-env es2022 */
import { argStrings, shell$, updatePkgVersion } from '@maranomynet/libtools';

import { publishToNpm } from '../../build-helpers.mjs';

await updatePkgVersion({ preReleaseName: argStrings.name });
await import(`./build.mjs`);
if (!process.env.SKIP_VISUAL_TESTS) {
  await shell$(`yarn workspace hanna-visual-tests run test`);
}
await publishToNpm();
