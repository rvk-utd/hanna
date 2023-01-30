const { series, parallel, src, dest } = require('gulp');
const del = require('del');
const { existsSync, writeFileSync } = require('fs');
const iconfontTaskFactory = require('@hugsmidjan/gulp-iconfont');
const imagesTaskFactory = require('@hugsmidjan/gulp-images');
const { execSync } = require('child_process');

// ---------------------------------------------------------------------------

const {
  cssVersion,
  sourceFolder,
  publicFolder,
  serverFolder,
  devDistCssFolder,
  publishCssFolder,
  publishDevCssFolder,
  assetsDistFolder,
} = require('./scripts/config');

// ---------------------------------------------------------------------------

const [imagesCompress, imagesWatch] = imagesTaskFactory({
  src: sourceFolder,
  dist: devDistCssFolder,
  // glob: ['i/**/*', '!i/_raw/**'],
});

const [staticAssetsCompress, staticAssetsWatch] = imagesTaskFactory({
  name: 'assets',
  src: sourceFolder + 'assets/',
  dist: assetsDistFolder,
  svgoRules: { inlineStyles: false },
  // Note the imagesTaskFactory simply copies over any file-types
  // it doesn't recognize as compressible images.
  glob: ['**/*', '!_raw/**'],
});

const [iconfontBundle, iconfontWatch] = iconfontTaskFactory({
  src: sourceFolder,
  dist: devDistCssFolder + 'i/',
  // glob: 'iconfont/*.svg',
  onGlyps: (glyphs) => {
    const icons = Object.fromEntries(
      glyphs.map(({ name, unicode }) => [
        // Map "-" in filenames to underscores for easier use as JavaScript props
        'icon__' + name.replace(/-/g, '_'),
        unicode[0],
      ])
    );
    writeFileSync(
      sourceFolder + '/lib/iconfonttokens.ts',
      `` +
        `// This file is auto-generated. DO NOT EDIT!\n` +
        `\n` +
        `export default ${JSON.stringify(icons, null, 2)}\n`
    );
  },
});

const makeGitCommitTask = (folder) => (done) => {
  const folderLocalName = folder.substr(serverFolder.length);
  const folderPrettyName = folder.substr(publicFolder.length);
  try {
    execSync(
      [
        `cd ${serverFolder}`,
        `git reset`,
        `git add ${folderLocalName}`,
        `git commit -m "build: ${folderPrettyName}"`,
        `git reset --hard`,
      ].join('  &&  ')
    );
  } catch (error) {
    console.error(error.stdout.toString());
  }
  done();
};

// ===========================================================================

const updateDistFolder = (done) => {
  execSync(
    [
      `git submodule update --init`,

      `cd ${serverFolder}`,
      `git checkout main`,
      `cd -`,

      `git submodule update --remote --rebase`,
    ].join(' && ')
  );
  done();
};

const gulpExec = (cmd) => (done) => {
  execSync(cmd);
  done();
};

const visuallyTest = gulpExec(`yarn workspace hanna-visual-tests run test`);

const copyToCssFolder = () => {
  if (existsSync(publishCssFolder)) {
    throw new Error('Publishing folder already exists.');
  }
  execSync(`yarn run -T ospec scripts/prepublish.tests.js`);

  return src(devDistCssFolder + '**/*', { base: devDistCssFolder }).pipe(
    dest(publishCssFolder)
  );
};
const copyToDevCssFolder = () =>
  src(devDistCssFolder + '**/*', { base: devDistCssFolder }).pipe(
    dest(publishDevCssFolder)
  );

const commitCssToGit = makeGitCommitTask(publishCssFolder);
const commitDevCssToGit = makeGitCommitTask(publishDevCssFolder);
const commitAssetsToGit = makeGitCommitTask(assetsDistFolder.replace(/\/$/, ''));

// ===========================================================================

const cleanupAssets = () => del([assetsDistFolder], { force: true });
const cleanupPublicDevCss = () => del([publishDevCssFolder], { force: true });

// ===========================================================================

const compressImages = series(imagesCompress);
const buildAssets = series(cleanupAssets, staticAssetsCompress);

// -------------------------

exports.publishCss = series(
  updateDistFolder,
  gulpExec(`yarn run build:css`),
  visuallyTest,
  () => cssVersion.startsWith('v0.') && del([publishCssFolder], { force: true }), // NOTE: only do this before v1.0
  copyToCssFolder,
  commitCssToGit
);

exports.publishDevCss = series(
  updateDistFolder,
  gulpExec(`yarn run build:css:dev`),
  // visuallyTest, // NOTE: Visual tests should test the production CSS
  cleanupPublicDevCss,
  copyToDevCssFolder,
  commitDevCssToGit
);
exports.publishAssets = series(
  updateDistFolder,
  buildAssets,
  // visuallyTest, // running the whole VRT suite on assets AND then again for devCSS is pro'lly overkill
  commitAssetsToGit
);

// -------------------------

exports.compressImages = compressImages;
exports.buildAssets = buildAssets;

// (Used by build.mjs)
exports.iconfont = iconfontBundle;

exports.buildAll = parallel(buildAssets, compressImages);

exports.watch = series([
  parallel(
    compressImages
    // buildAssets,
  ),
  parallel(
    imagesWatch,
    iconfontWatch
    /* Uncomment when needed */
    // staticAssetsWatch,
  ),
]);

exports.default = exports.build;
