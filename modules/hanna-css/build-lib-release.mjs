//@ts-check
import { argStrings, updatePkgVersion } from '@maranomynet/libtools';

import { publishToNpm } from '../../build-helpers.mjs';

const changelogSuffix = '-lib';

(async () => {
  await updatePkgVersion({ changelogSuffix, preReleaseName: argStrings.name });
  await import(`./build-lib.mjs`).then((exports) => exports.default);
  await publishToNpm({ changelogSuffix, updatePkgs: ['hanna-react'] });
})();
