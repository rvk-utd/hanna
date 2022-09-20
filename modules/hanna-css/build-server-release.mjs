/* eslint-env es2022 */
import { execSync } from 'child_process';
import { readFile } from 'fs/promises';

import { serverFolder } from './scripts/config.js';

const pkg = JSON.parse(await readFile('./package-server.json'));

execSync(
  [
    `git submodule update --init`,

    `cd ${serverFolder}`,
    `git checkout feature/style-server`,
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
    `git add ./*`,
    `git commit -m "release(css): v${pkg.cssVersion}"`,
    `git reset --hard`,

    // local commit
    `cd -`,
    `git add ./*-server.* ./src/**/style-server-info.ts ${serverFolder}`,
    `git commit -m "release(css): v${pkg.cssVersion}"`,
  ].join(' && ')
);
