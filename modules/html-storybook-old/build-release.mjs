//@ts-check
/* eslint-env es2022 */
import { execSync } from 'child_process';
import { existsSync } from 'fs';

import {
  htmlDocsFolder,
  htmlVersion,
  htmlVersionFolder,
  rootFolder,
  serverFolder,
  tempDistFolder,
} from './build-config.mjs';

if (!existsSync(tempDistFolder)) {
  process.exit(1);
}
try {
  execSync(
    [
      `git submodule update --init`,

      `cd ${serverFolder}`,
      `git checkout main`,
      `cd -`,

      `git submodule update --remote --rebase`,

      // update submodule files
      `rm -rf ${htmlDocsFolder + htmlVersionFolder} ${htmlDocsFolder}latest`,
      `(mkdir ${htmlDocsFolder}latest || exit 0)`,
      `cp -R ${tempDistFolder}/* ${htmlDocsFolder}latest`,
      `mv ${tempDistFolder} ${htmlDocsFolder + htmlVersionFolder}`,

      // submodule commit
      `cd ${serverFolder}`,
      `git reset`,
      `git add "./*"`,
      `git commit -m "release(html-storybook): v${htmlVersion}"`,
      `git reset --hard`,

      // local commit
      `cd -`,
      `git add ${rootFolder}package.json ${rootFolder}CHANGELOG.md ${serverFolder}`,
      `git commit -m "release(html): v${htmlVersion}"`,
    ].join(' && ')
  );
} catch (err) {
  console.info('--------------------------');
  console.info(err.message);
  console.info('--------------------------');
  console.info(err.output.toString());
  process.exit(1);
}
