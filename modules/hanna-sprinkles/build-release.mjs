//@ts-check
/* eslint-env es2022 */
/*
  2. copy ./redirects-sprinkles.json to ${serverFolder}redirects-sprinkles.json
  3. update ./redirects-sprinkles.json to point to ${version}
  4. copy ./CHANGELOG.md to ${serverFolder}public/sprinkles/changelog.txt
  5. commit changes to hanna-server-styles
  6. commit changes to hanna repo

  TODO: Create a sprinkles/index.html which either links to the README.md,
  or contains the contents of the readme file
*/
import { args, logThenExit1, shell$ } from '@maranomynet/libtools';
import { existsSync } from 'fs';

import { bumpVersion, getServerConfig } from './build-config.mjs';

const fixupMessage = args.fixup ? ' (fixup)' : '';

if (!args.fixup) {
  await bumpVersion();
}
const {
  distFolder,
  serverPath,
  sprinklesPath,
  sprinklesVersionPath,
  version,
  versionFolder,
} = await getServerConfig();

await import(`./build.mjs`);

if (!existsSync(distFolder)) {
  logThenExit1(new Error(`distFolder does not exist: ${distFolder}`));
}

const redirectsFile = 'redirects-sprinkles.json';

await shell$([
  `git submodule update --init --quiet`,
  `cd ${serverPath}`,
  `git stash`,
  `git checkout main`,
  `cd -`,
  `git submodule update --remote --rebase --quiet`,

  // update submodule files
  `cp -R ${distFolder} ${sprinklesVersionPath}`,

  // update redirects
  `cp CHANGELOG.md ${sprinklesPath}changelog.txt`,
  `sed 's/\${versionFolder}/${versionFolder}/g' ${redirectsFile} > ${
    serverPath + redirectsFile
  }`,

  // submodule commit
  `cd ${serverPath}`,
  `git add "./*"`,
  `git commit -m "release(sprinkles): v${version}${fixupMessage}"`,
  `cd -`,

  // local commit
  `git add ./package.json ./CHANGELOG.md ${serverPath}`,
  `git commit -m "release(sprinkles): v${version}${fixupMessage}"`,
]);
