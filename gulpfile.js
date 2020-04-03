/* global process */
const { series, parallel, src, dest } = require('gulp');
const del = require('del');
const iconfontTaskFactory = require('@hugsmidjan/gulp-iconfont');
const imagesTaskFactory = require('@hugsmidjan/gulp-images');
const sassTaskFactory = require('@hugsmidjan/gulp-sass');
const sassFunctions = require('./scripts/sassFunctions');
const { existsSync } = require('fs');

// ---------------------------------------------------------------------------

const {
	sourceFolder,
	distFolder,
	devDistCssFolder,
	publishCssFolder,
	publishDevCssFolder,
	assetsDistFolder,
} = require('./scripts/config');
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

// ---------------------------------------------------------------------------

const [imagesCompress, imagesWatch] = imagesTaskFactory({
	src: sourceFolder,
	dist: devDistCssFolder,
	// glob: ['i/**/*', '!i/_raw/**'],
});

const [staticAssetsCompress, staticAssetsWatch] = imagesTaskFactory({
	src: sourceFolder + 'assets/',
	dist: assetsDistFolder,
	glob: ['**/*', '!_raw/**'],
});

const [iconfontBundle, iconfontWatch] = iconfontTaskFactory({
	src: sourceFolder,
	dist: devDistCssFolder + 'i/',
	scssFile: 'scss/vars/icons.scss',
	// glob: 'iconfont/*.svg',
});

const [sassBuild, sassWatch] = sassTaskFactory({
	src: sourceFolder + 'scss/',
	dist: devDistCssFolder,
	// glob: ['*.{scss,sass}']
	// watchGlob: ['*/**/*.{scss,sass}'],
	sourcemaps: isDev ? '.' : false,
	sassOptions: { functions: sassFunctions },
	minify: !isDev,
});

const makeGitCommitTask = (folder) => (done) => {
	try {
		require('child_process').execSync(
			`git reset  &&  ` +
				`git add ${folder}  &&  ` +
				`git commit -m "publish: ${folder.substr(distFolder.length)}"`
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
	require('child_process').execSync('ospec scripts/prepublish.tests.js');

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

const cleanupCSS = () => del([devDistCssFolder]);
const cleanupAssets = () => del([assetsDistFolder]);
const cleanupPublicDevCss = () => del([publishDevCssFolder]);

// ===========================================================================

const buildCss = series(
	cleanupCSS,
	parallel(imagesCompress, series(iconfontBundle, sassBuild))
);
const buildAssets = series(cleanupAssets, staticAssetsCompress);

// -------------------------

exports.publishCss = series(buildCss, copyToCssFolder, commitCssToGit);
exports.publishDevCss = series(
	buildCss,
	cleanupPublicDevCss,
	copyToDevCssFolder,
	commitDevCssToGit
);
exports.publishAssets = series(buildAssets, commitAssetsToGit);

exports.publishAll = series(
	exports.publishCss,
	exports.publishDevCss,
	exports.publishAssets
);

// -------------------------

exports.build = parallel(buildAssets, buildCss);

exports.watch = series([
	exports.build,
	parallel(sassWatch, imagesWatch, staticAssetsWatch, iconfontWatch),
]);

exports.default = exports.build;
