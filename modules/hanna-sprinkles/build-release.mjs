//@ts-check
/*
  2. copy ./redirects-sprinkles.json to ${serverFolder}redirects-sprinkles.json
  3. update ./redirects-sprinkles.json to point to ${version}
  4. copy ./CHANGELOG.md to ${serverFolder}public/sprinkles/changelog.txt
  5. commit changes to hanna-server-styles
  6. commit changes to hanna repo

  TODO: Create a sprinkles/index.html which either links to the README.md,
  or contains the contents of the readme file
*/
import { execSync } from 'child_process';
import { existsSync } from 'fs';

import {
  distFolder,
  serverPath,
  sprinklesPath,
  sprinklesVersionPath,
  version,
  versionFolder,
} from './build-config.mjs';

const redirectsFile = 'redirects-sprinkles.json';

if (!existsSync(distFolder)) {
  process.exit(1);
}

try {
  execSync(
    [
      `git submodule update --init`,

      `cd ${serverPath}`,
      `git checkout main`,
      `cd -`,

      `git submodule update --remote --rebase`,

      // update submodule files
      `(mkdir ${sprinklesPath} || exit 0)`,
      `(mkdir ${sprinklesVersionPath} || exit 0)`,
      `cp -R ${distFolder}* ${sprinklesVersionPath}`,

      // update redirects
      `cp CHANGELOG.md ${sprinklesPath}changelog.txt`,
      `sed 's/\${versionFolder}/${versionFolder}/g' ${redirectsFile} > ${
        serverPath + redirectsFile
      }`,

      // submodule commit
      `cd ${serverPath}`,
      `git reset`,
      `git add "./*"`,
      `git commit -m "release(sprinkles): v${version}"`,
      `git reset --hard`,

      // local commit
      `cd -`,
      `git add ./package.json ./CHANGELOG.md ../../servers/styles`,
      `git commit -m "release(sprinkles): v${version}"`,
    ].join(' && ')
  );
} catch (err) {
  console.log('--------------------------');
  console.log(err.message);
  console.log('--------------------------');
  console.log(err.output.toString());
  process.exit(1);
}
