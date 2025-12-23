//@ts-check
import { argStrings, shell$, updatePkgVersion } from '@maranomynet/libtools';

import { publishToNpm } from '../../build-helpers.mjs';

(async () => {
  await updatePkgVersion({ preReleaseName: argStrings.name });
  await import(`./build.mjs`);
  if (!process.env.SKIP_VISUAL_TESTS) {
    await shell$(`yarn workspace hanna-visual-tests run test`);
  }
  await publishToNpm();
})();
