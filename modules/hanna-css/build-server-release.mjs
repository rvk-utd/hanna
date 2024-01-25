//@ts-check
/* eslint-env es2022 */
import { existsSync } from 'fs';
import { sync as globSync } from 'glob';

import { $, opts, updatePkgVersion } from '../../build-helpers.mjs';

import {
  assetsDistFolder,
  devDistCssFolder,
  getCssVersionConfig,
  publicFolder,
  serverFolder,
  serverPkgConfig,
} from './build/config.mjs';
import { compressStaticAssets } from './build/gulp-tasks.mjs';
import { buildCssFiles } from './build/helpers.mjs';

// ===========================================================================

/**
 * @returns {Promise<void>}
 */
const resetStyleServerSubmodule = () =>
  $([
    `git submodule update --init`,
    `cd ${serverFolder}`,
    `git checkout main`,
    `cd -`,
    `git submodule update --remote --rebase`,
  ]);

/**
 * @param {string} folder
 * @returns {Promise<void>}
 */
const commitToGitSubmodule = (folder) =>
  $([
    `cd ${serverFolder}`,
    `git reset`,
    `git add ${folder.slice(serverFolder.length)}`,
    `git commit -m "build: ${folder.slice(publicFolder.length)}"`,
    `git reset --hard`,
  ]);

/**
 * @param {string} publishCssFolder
 * @returns {Promise<void>}
 */
const runPrePublishTests = async (publishCssFolder) => {
  let cssFolderAlreadyExist = existsSync(publishCssFolder);
  if (cssFolderAlreadyExist && globSync(`${publishCssFolder}/*`).length === 0) {
    await $(`rmdir ${publishCssFolder}`);
    cssFolderAlreadyExist = false;
  }
  if (cssFolderAlreadyExist) {
    throw new Error(`Publishing folder "${publishCssFolder}" already exists`);
  }
  if (
    !existsSync(devDistCssFolder) ||
    globSync(`${devDistCssFolder}/*.css`).length === 0
  ) {
    throw new Error(`No CSS files found in dev folder "${devDistCssFolder}"`);
  }
};

// ===========================================================================

// ===========================================================================

await updatePkgVersion(serverPkgConfig);

const { cssFolderVersion, fullCssVersion, majorCssVersion } = await getCssVersionConfig();

await resetStyleServerSubmodule();
await import('./build-lib.mjs'); // CSS builds depend on the lib being correct

// Build and commit dev-v* CSS
await buildCssFiles('development');
const publishDevCssFolder = `${publicFolder}css/dev-v${majorCssVersion}`;
await $(`rm -rf ${publishDevCssFolder}`);
await $(`cp -R ${devDistCssFolder}/* ${publishDevCssFolder}`);
await commitToGitSubmodule(publishDevCssFolder);

// Build and commit production CSS
await buildCssFiles('production');
const publishCssFolder = `${publicFolder}css/v${cssFolderVersion}`;
cssFolderVersion.startsWith('0.') && (await $(`rm -rf ${publishCssFolder}`));
await runPrePublishTests(publishCssFolder);
await $(`cp -R ${devDistCssFolder}/* ${publishCssFolder}`);
await commitToGitSubmodule(publishCssFolder);

if (!opts.skipAssets) {
  // Compress and commit assets
  await $(`rm -rf ${assetsDistFolder}`);
  await compressStaticAssets();
  await commitToGitSubmodule(assetsDistFolder.replace(/\/$/, ''));
}

// Update submodule root files and commit the version bump
await $([
  `git submodule update --init`,

  `cd ${serverFolder}`,
  `git checkout main`,
  `cd -`,

  `git submodule update --remote --rebase`,

  // update submodule files
  `cp package-server.json ${serverFolder}package.json`,
  `cp README-server.md ${serverFolder}README.md`,
  `cp CHANGELOG-server.md ${serverFolder}CHANGELOG.md`,
  `cp cssserve-prod-server.json ${serverFolder}cssserve-prod.json`,

  // submodule commit
  `cd ${serverFolder}`,
  `yarn install`,
  `git reset`,
  `git add "./*"`,
  `git commit -m "release(css): v${fullCssVersion}"`,
  `git reset --hard`,

  // local commit
  `cd -`,
  `git add ./*-server.* ./src/**/style-server-info.ts ${serverFolder}`,
  `git commit -m "release(css): v${fullCssVersion}"`,
]);
