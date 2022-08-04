import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { exit } from 'process';

import {
  htmlDocsFolder,
  htmlVersion,
  serverFolder,
  tempDistFolder,
} from './build-config.mjs';

if (!existsSync(tempDistFolder)) {
  exit(1);
}

execSync(
  [
    `git submodule update --init`,

    `cd ${serverFolder}`,
    `git checkout main`,
    `cd -`,

    `git submodule update --remote --rebase`,

    // update submodule files
    `rm -rf ${htmlDocsFolder + htmlVersion}`,
    `cp -R ${tempDistFolder} ${htmlDocsFolder}latest`,
    `mv ${tempDistFolder} ${htmlDocsFolder + htmlVersion}`,

    // submodule commit
    `cd ${serverFolder}`,
    `git reset`,
    `git add ./*`,
    `git commit -m "release(html-storybook): v${htmlVersion}"`,
    `git reset --hard`,

    // local commit
    `cd -`,
    `git add ${serverFolder}`,
    `git commit -m "release(html-storybook): v${htmlVersion}"`,
  ].join(' && ')
);
