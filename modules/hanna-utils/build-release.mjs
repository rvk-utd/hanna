//@ts-check
import { argStrings, updatePkgVersion } from '@maranomynet/libtools';

import { publishToNpm } from '../../build-helpers.mjs';

(async () => {
  await updatePkgVersion({ preReleaseName: argStrings.name });
  await import(`./build.mjs`);
  await publishToNpm({ updatePkgs: ['hanna-css', 'hanna-react'] });
})();
