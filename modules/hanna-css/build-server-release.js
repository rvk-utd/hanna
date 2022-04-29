const { execSync } = require('child_process');
const { serverFolder } = require('./scripts/config');
const pkg = require('./package-server.json');

execSync(
  [
    `cd ${serverFolder}`,
    `git checkout style-server`,
    `cd -`,

    `git submodule update --remote --rebase`,

    // update submodule files
    `cp package-server.json ${serverFolder}package.json`,
    `cp README-server.md ${serverFolder}README.md`,
    `cp CHANGELOG-server.md ${serverFolder}CHANGELOG.md`,

    // submodule commit
    `cd ${serverFolder}`,
    `git reset`,
    `git add ./*`,
    `git commit -m "release(css): v${pkg.cssVersion}"`,
    `git reset --hard`,

    // local commit
    `cd -`,
    `git add ./*-server.* ${serverFolder}`,
    `git commit -m "release(css): v${pkg.cssVersion}"`,
  ].join(' && ')
);
