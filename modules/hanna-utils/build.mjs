//@ts-check
/* eslint-env es2022 */
import { readFile, writeFile } from 'fs/promises';

import { buildAndRunTests, buildNpmLib, distDir, opts } from '../../build-helpers.mjs';

await buildAndRunTests();

await buildNpmLib('utils', {
  sideEffects: ['**/focus-visible.js'],
  shallowCopy: true,
});

if (!opts.dev) {
  // Poor man's tsc replace-string plugin
  await Promise.all(
    ['.', `esm`].map(async (folder) => {
      const fileName = `${distDir}/${folder}/assets.js`;
      const contents = await readFile(fileName);
      await writeFile(
        fileName,
        contents.toString().replace(/typeof _NPM_PUB_/g, "'boolean'")
      );
    })
  );
}
