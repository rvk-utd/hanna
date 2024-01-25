//@ts-check
/* eslint-env es2022 */
import { publishToNpm, updatePkgVersion } from '../../build-helpers.mjs';

/** @type {import('../../build-helpers.mjs').PublishOpts} */
const publishOpts = {
  changelogSuffix: '-lib',
  updatePkgs: ['hanna-react'],
};

await updatePkgVersion(publishOpts);
await import(`./build-lib.mjs`);
await publishToNpm(publishOpts);
