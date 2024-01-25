//@ts-check
/* eslint-env es2022 */
import { publishToNpm, updatePkgVersion } from '../../build-helpers.mjs';

await updatePkgVersion();
await import(`./build.mjs`);
await publishToNpm({ updatePkgs: ['hanna-css', 'hanna-react'] });
