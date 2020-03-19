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
	cssVersion,
	sourceFolder,
	devDistCssFolder,
	publishCssFolder,
	assetsDistFolder,
} = require('./scripts/config');
const isDev = process.env.NODE_ENV !== 'production';

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

// ===========================================================================

const publish_copyToCssFolder = () => {
	if (existsSync(publishCssFolder)) {
		throw new Error('Publishing folder already exists.');
	}
	return src('**/*', { base: devDistCssFolder, ignore: '**/*.css.map' }).pipe(
		dest(publishCssFolder)
	);
};
const publish_commitToGit = (done) => {
	try {
		require('child_process').execSync(
			'git reset  &&  ' +
				'git add public/css  &&  ' +
				`git commit -m "publish: css/${cssVersion}"`
		);
	} catch (error) {
		done(error);
	}
	try {
		require('child_process').execSync(
			'git reset  &&  ' +
				'git add public/assets  &&  ' +
				`git commit -m "publish: assets"`
		);
	} catch (error) {}
	done();
};
const publish = series(publish_copyToCssFolder, publish_commitToGit);

// ===========================================================================

const cleanup = () => del([devDistCssFolder, assetsDistFolder]);

// ===========================================================================

exports.build = series(
	cleanup,
	parallel(imagesCompress, staticAssetsCompress, series(iconfontBundle, sassBuild))
);
exports.watch = series([
	exports.build,
	parallel(sassWatch, imagesWatch, staticAssetsWatch, iconfontWatch),
]);
exports.publish = publish;

exports.default = exports.build;
