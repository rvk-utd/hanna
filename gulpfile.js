const { series, parallel, src, dest } = require('gulp');
const del = require('del');
const iconfontTaskFactory = require('@hugsmidjan/gulp-iconfont');
const imagesTaskFactory = require('@hugsmidjan/gulp-images');
const sassTaskFactory = require('@hugsmidjan/gulp-sass');
const { existsSync } = require('fs');

// ---------------------------------------------------------------------------

const { cssSourceFolder, devDistFolder, publishFolder } = require('scripts/config');

// ---------------------------------------------------------------------------

const [imagesCompress, imagesWatch] = imagesTaskFactory({
	src: cssSourceFolder,
	dist: devDistFolder,
	// glob: ['i/**/*', '!i/_raw/**'],
});

const [iconfontBundle, iconfontWatch] = iconfontTaskFactory({
	src: cssSourceFolder,
	dist: devDistFolder + 'i/',
	// glob: 'iconfont/*.svg',
});

const [sassBuild, sassWatch] = sassTaskFactory({
	src: cssSourceFolder,
	dist: devDistFolder,
	sassOptions: {
		functions: {
			'pct($number)': (number) => {
				const sass = require('sass');
				if (!(number instanceof sass.types.Number)) {
					throw new Error('$number: Expected a number.');
				} else if (number.getUnit()) {
					throw new Error('$number: Expected a unitless number.');
				}
				return new sass.types.Number(number.getValue() * 100, '%');
			},
		},
	},
});

// ===========================================================================

const publish = () => {
	if (existsSync(publishFolder)) {
		throw new Error('Publishing folder already exists');
	}
	src(['**/*', '!*.css.map'], { base: devDistFolder }).pipe(dest(publishFolder));
};

// ===========================================================================

const cleanup = () => del([devDistFolder]);

// ===========================================================================

exports.build = series(
	cleanup,
	parallel(imagesCompress, series(iconfontBundle, sassBuild))
);
exports.watch = series([exports.build, parallel(sassWatch, imagesWatch, iconfontWatch)]);
exports.publish = publish;

exports.default = exports.build;
