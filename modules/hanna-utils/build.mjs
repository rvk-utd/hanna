// @ts-check
import { readFile, writeFile } from 'fs/promises';

import { buildNpmLib, buildTests, distDir, opts } from '../../build-helpers.mjs';

buildTests();
buildNpmLib('utils', {
  sideEffects: ['**/focus-visible.js'],
  shallowCopy: true,
});

if (!opts.dev) {
  // poor man's tsc replace-string plugin
  ['.' /* , 'esm' */].forEach((folder) => {
    const fileName = `${distDir}/${folder}/assets.js`;
    readFile(fileName)
      .then((contents) =>
        contents.toString().replace(/typeof _NPM_PUB_ !== 'undefined'/g, 'true')
      )
      .then((content) => writeFile(fileName, content));
  });
}
