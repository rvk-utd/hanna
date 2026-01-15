//@ts-check
import { args, getPkgVersion, shell$, updatePkgVersion } from '@maranomynet/libtools';
import { existsSync } from 'fs';

const root = '../../';
const serverFolder = `${root}servers/docs/`;
const htmlDocsFolder = `${serverFolder}public/html/`;
const tempDistFolder = 'storybook-static';

const fixupMessage = args.fixup ? ' (fixup)' : '';

if (!args.fixup) {
  await updatePkgVersion({ root, offerDateShift: true });
}

await shell$(`yarn run build`);

if (!existsSync(tempDistFolder)) {
  throw new Error(
    `The folder "${tempDistFolder}" does not exist. Build must have failed.`
  );
}

const htmlVersion = await getPkgVersion({ root });
// Only use the MAJOR + MINOR version
const htmlVersionFolder = htmlVersion.split('.').slice(0, 2).join('.');

await shell$([
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
  `git commit -m "release(html-storybook): v${htmlVersion}${fixupMessage}"`,
  `cd -`,

  // local commit
  `git add ${root}package.json ${root}CHANGELOG.md ${serverFolder}`,
  `git commit -m "release(html): v${htmlVersion}${fixupMessage}"`,
]);
