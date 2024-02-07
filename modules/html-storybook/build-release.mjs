//@ts-check
/* eslint-env es2022 */
import { existsSync } from 'fs';

import { $, getPkgVersion, updatePkgVersion } from '../../build-helpers.mjs';

const rootFolder = '../../';
const serverFolder = `${rootFolder}servers/docs/`;
const htmlDocsFolder = `${serverFolder}public/html/`;
const tempDistFolder = 'storybook-static';

/** @type {import('../../build-helpers.mjs').PkgVersionCfg} */
const pkgConfig = {
  rootFolder,
  offerDateShift: true,
};

await updatePkgVersion(pkgConfig);

await $(`yarn run build`);

if (!existsSync(tempDistFolder)) {
  throw new Error(
    `The folder "${tempDistFolder}" does not exist. Build must have failed.`
  );
}

const htmlVersion = await getPkgVersion(pkgConfig);
// Only use the MAJOR + MINOR version
const htmlVersionFolder = htmlVersion.split('.').slice(0, 2).join('.');

await $([
  `git submodule update --init`,
  `cd ${serverFolder}`,
  `git stash`,
  `git checkout main`,
  `cd -`,
  `git submodule update --remote --rebase`,

  // update submodule files
  `rm -rf ${htmlDocsFolder + htmlVersionFolder} ${htmlDocsFolder}latest`,
  `mkdir -p ${htmlDocsFolder}latest`,
  `find ${tempDistFolder} -name "*.map" -type f -delete`,
  `cp -R ${tempDistFolder}/* ${htmlDocsFolder}latest`,
  `mv ${tempDistFolder} ${htmlDocsFolder + htmlVersionFolder}`,

  // submodule commit
  `cd ${serverFolder}`,
  `git add "./*"`,
  `git commit -m "release(html-storybook): v${htmlVersion}"`,
  `cd -`,

  // local commit
  `git add ${rootFolder}package.json ${rootFolder}CHANGELOG.md ${serverFolder}`,
  `git commit -m "release(html): v${htmlVersion}"`,
]);
