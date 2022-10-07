const { series, parallel, src, dest } = require('gulp');
const del = require('del');
const { existsSync, writeFileSync } = require('fs');
const iconfontTaskFactory = require('@hugsmidjan/gulp-iconfont');
const imagesTaskFactory = require('@hugsmidjan/gulp-images');
const sassTaskFactory = require('@hugsmidjan/gulp-sass');
const sassFunctions = require('./scripts/sassFunctions');
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

const isProd = process.env.NODE_ENV === 'production';

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

const [sassBuild, sassWatch] = sassTaskFactory({
  src: sourceFolder + 'css/',
  dist: devDistCssFolder,
  // glob: ['*.{scss,sass}']
  // watchGlob: ['*/**/*.{scss,sass}'],
  sassOptions: { functions: sassFunctions },
  sourcemaps: false,
  minify: isProd,
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
      `git checkout feature/style-server`,
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

const buildCss = series(
  // Don't run `iconfontBundle`, as that task is run from inside `build.ts`
  parallel(imagesCompress, sassBuild)
);
const buildAssets = series(cleanupAssets, staticAssetsCompress);

// -------------------------

exports.publishCss = series(
  updateDistFolder,
  gulpExec(`yarn run build:css`),
  // visuallyTest, // NOTE: Visual tests should test the dev-css
  () => cssVersion.startsWith('v0.') && del([publishCssFolder], { force: true }), // NOTE: only do this before v1.0
  copyToCssFolder,
  commitCssToGit
);

exports.publishDevCss = series(
  updateDistFolder,
  gulpExec(`yarn run build:css:dev`),
  visuallyTest,
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

exports.buildCss = buildCss;
exports.buildAssets = buildAssets;

exports.iconfont = iconfontBundle;

exports.buildAll = parallel(buildAssets, buildCss);

exports.watch = series([
  // buildAssets
  buildCss,
  parallel(
    sassWatch,
    imagesWatch,
    /* Uncomment when needed */
    // staticAssetsWatch,
    iconfontWatch
  ),
]);

exports.default = exports.build;
