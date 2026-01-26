//@ts-check
import { args, logError, shell$, updatePkgVersion } from '@maranomynet/libtools';
import { existsSync } from 'fs';
import { sync as globSync } from 'glob';

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

const fixupMessage = args.fixup ? ' (fixup)' : '';

/**
 * @returns {Promise<void>}
 */
const resetStyleServerSubmodule = () =>
  shell$([
    `git submodule update --init --quiet`,
    `cd ${serverFolder}`,
    `git stash`,
    `git checkout main`,
    `cd -`,
    `git submodule update --remote --rebase --quiet`,
  ]);

/**
 * @param {string} folder
 * @returns {Promise<void>}
 */
const commitToGitSubmodule = (folder) =>
  shell$(
    [
      `cd ${serverFolder}`,
      `git add ${folder.slice(serverFolder.length)}`,
      `git commit -m "build: ${folder.slice(publicFolder.length)}${fixupMessage}"`,
    ],
    logError
  );

/**
 * @param {string} publishCssFolder
 * @returns {Promise<void>}
 */
const runPrePublishTests = async (publishCssFolder) => {
  let cssFolderAlreadyExist = existsSync(publishCssFolder);
  if (cssFolderAlreadyExist && globSync(`${publishCssFolder}/*`).length === 0) {
    await shell$(`rmdir ${publishCssFolder}`);
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

if (!args.fixup) {
  await updatePkgVersion(serverPkgConfig);
}
const { cssFolderVersion, fullCssVersion, majorCssVersion } = await getCssVersionConfig();

await resetStyleServerSubmodule();
await import('./build-lib.mjs'); // CSS builds depend on the lib being correct

// Build and commit production CSS
await buildCssFiles('production');
if (!process.env.SKIP_VISUAL_TESTS) {
  await shell$(`yarn workspace hanna-visual-tests run test`);
}
const publishCssFolder = `${publicFolder}css/v${cssFolderVersion}`;
cssFolderVersion.startsWith('0.') && (await shell$(`rm -rf ${publishCssFolder}`));
await runPrePublishTests(publishCssFolder);
await shell$(`cp -R ${devDistCssFolder} ${publishCssFolder}`);
await commitToGitSubmodule(publishCssFolder);

// Build and commit dev-v* CSS
await buildCssFiles('development');
const publishDevCssFolder = `${publicFolder}css/dev-v${majorCssVersion}`;
await shell$(`rm -rf ${publishDevCssFolder}`);
await shell$(`cp -R ${devDistCssFolder} ${publishDevCssFolder}`);
await commitToGitSubmodule(publishDevCssFolder);

if (!args.skipAssets) {
  // Compress and commit assets
  await shell$(`rm -rf ${assetsDistFolder}`);
  await compressStaticAssets();
  await commitToGitSubmodule(assetsDistFolder.replace(/\/$/, ''));
}

// Update submodule root files and commit the version bump
await shell$(
  [
    // update submodule files
    `cp package-server.json ${serverFolder}package.json`,
    `cp README-server.md ${serverFolder}README.md`,
    `cp CHANGELOG-server.md ${serverFolder}CHANGELOG.md`,
    `cp cssserve-prod-server.json ${serverFolder}cssserve-prod.json`,

    // submodule commit
    `cd ${serverFolder}`,
    `yarn install`, // in case package-server.json has new dependencies
    `git add "./*"`,
    `git commit -m "release(css): v${fullCssVersion}${fixupMessage}"`,
  ],
  logError
);

await shell$([
  // local commit
  `git add ./*-server.* ./src/**/style-server-info.ts ${serverFolder}`,
  `git commit -m "release(css): v${fullCssVersion}${fixupMessage}"`,
]);
