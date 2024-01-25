//@ts-check
/* eslint-env es2022 */
import { $, publishToNpm, updatePkgVersion } from '../../build-helpers.mjs';

await updatePkgVersion();
await import(`./build.mjs`);
if (!process.env.SKIP_VISUAL_TESTS) {
  await $(`yarn workspace hanna-visual-tests run test`);
}
await publishToNpm();
