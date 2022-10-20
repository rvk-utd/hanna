import { readFile, writeFile } from 'fs/promises';

import { buildNpmLib, buildTests, distDir, opts } from '../../build-helpers.mjs';

buildTests();
buildNpmLib('utils', {
  sideEffects: ['**/focus-visible.js'],
});

if (!opts.dev) {
  // poor man's tsc replace-string plugin
  ['.' /* , 'esm' */].forEach((folder) => {
    const fileName = `${distDir}/${folder}/cssutils.js`;
    readFile(fileName)
      .then((contents) =>
        contents.toString().replaceAll(`typeof _NPM_PUB_ !== 'undefined'`, 'true')
      )
      .then((content) => writeFile(fileName, content));
  });
}
