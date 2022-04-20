const { series, parallel, src, dest } = require('gulp');
const del = require('del');
const iconfontTaskFactory = require('@hugsmidjan/gulp-iconfont');
const imagesTaskFactory = require('@hugsmidjan/gulp-images');
const sassTaskFactory = require('@hugsmidjan/gulp-sass');
const sassFunctions = require('./scripts/sassFunctions');
const { existsSync } = require('fs');

// ---------------------------------------------------------------------------

const {
	cssVersion,
	sourceFolder,
	distFolder,
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
	sassOptions: { functions: sassFunctions },
	sourcemaps: isProd ? false : '.',
	minify: isProd,
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

const copyNonImagesToAssetFolder = () =>
	src(sourceFolder + 'assets/**/*.{json,txt}', { base: sourceFolder + 'assets/' }).pipe(
		dest(assetsDistFolder)
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
const buildAssets = series(
	cleanupAssets,
	parallel(copyNonImagesToAssetFolder, staticAssetsCompress)
);

// -------------------------

exports.publishCss = series(
	buildCss,
	() => cssVersion.startsWith('v0.') && del([publishCssFolder]), // NOTE: only do this before v1.0
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

exports.build = parallel(buildAssets, buildCss);

exports.watch = series([
	// exports.build, // with assets
	buildCss, // without assets
	parallel(
		sassWatch,
		imagesWatch,
		/* Uncomment when needed */
		// staticAssetsWatch,
		iconfontWatch
	),
]);

exports.default = exports.build;
