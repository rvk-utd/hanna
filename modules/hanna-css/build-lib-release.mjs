//@ts-check
/* eslint-env es2022 */
import { argStrings, updatePkgVersion } from '@maranomynet/libtools';

import { publishToNpm } from '../../build-helpers.mjs';

const changelogSuffix = '-lib';

await updatePkgVersion({ changelogSuffix, preReleaseName: argStrings.name });
await import(`./build-lib.mjs`);
await publishToNpm({ changelogSuffix, updatePkgs: ['hanna-react'] });
