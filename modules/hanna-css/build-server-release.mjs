/* eslint-env es2022 */
import { execSync } from 'child_process';
import { readFile } from 'fs/promises';

import { serverFolder } from './scripts/config.js';

const pkg = JSON.parse(await readFile('./package-server.json'));

execSync(`git submodule update --init`);

execSync(`cd ${serverFolder}`);
execSync(`git checkout feature/style-server`);
execSync(`cd -`);

execSync(`git submodule update --remote --rebase`);

// update submodule files
execSync(`cp package-server.json ${serverFolder}package.json`);
execSync(`cp README-server.md ${serverFolder}README.md`);
execSync(`cp CHANGELOG-server.md ${serverFolder}CHANGELOG.md`);
execSync(`cp cssserve-prod-server.json ${serverFolder}cssserve-prod.json`);

// submodule commit
execSync(`cd ${serverFolder}`);
execSync(`yarn install`);
execSync(`git reset`);
execSync(`git add "./*"`);
execSync(`git commit -m "release(css): v${pkg.cssVersion}"`);
execSync(`git reset --hard`);

// local commit
execSync(`cd -`);
execSync(`git add ./*-server.* ./src/**/style-server-info.ts ${serverFolder}`);
execSync(`git commit -m "release(css): v${pkg.cssVersion}"`);
