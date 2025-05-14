//@ts-check
/* eslint-env es2022 */
import { argStrings, updatePkgVersion } from '@maranomynet/libtools';

import { publishToNpm } from '../../build-helpers.mjs';

await updatePkgVersion({ preReleaseName: argStrings.name });
await import(`./build.mjs`);
await publishToNpm({ updatePkgs: ['hanna-css', 'hanna-react'] });
