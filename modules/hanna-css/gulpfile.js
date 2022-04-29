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
      glyphs.map(({ name, unicode }) => [name, unicode[0]])
    );
    writeFileSync(
      sourceFolder + '/lib/iconfont.ts',
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
  try {
    execSync(
      `git reset  &&  ` +
        `git add ${folder}  &&  ` +
        `git commit -m "publish: ${folder.substr(publicFolder.length)}"`
    );
  } catch (error) {
    console.error(error.stdout.toString());
  }
  done();
};

// ===========================================================================

const copyToCssFolder = () => {
  if (existsSync(publishCssFolder)) {
    throw new Error('Publishing folder already exists.');
  }
  execSync('ospec scripts/prepublish.tests.js');

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
  buildCss,
  () => cssVersion.startsWith('v0.') && del([publishCssFolder], { force: true }), // NOTE: only do this before v1.0
  copyToCssFolder,
  commitCssToGit
);
exports.publishDevCss = series(
  buildCss,
  cleanupPublicDevCss,
  copyToDevCssFolder,
  commitDevCssToGit
);
exports.publishAssets = series(buildAssets, commitAssetsToGit);

// -------------------------

exports.iconfont = iconfontBundle;

exports.build = parallel(buildAssets, buildCss);

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
