const o = require('ospec');
const { existsSync } = require('fs');
const glob = require('glob').sync;
const { devDistFolder } = require('./config');

o.spec('SASS build', () => {
	o('Built CSS files exist', () => {
		const devFilesExist =
			existsSync(devDistFolder) && glob(devDistFolder + '/*.css').length > 0;
		o(devFilesExist).equals(true);
	});
	// TODO: Check if CSS files have valid dependency declarations.
	// /*!@deps
	// 	Button
	// 	Carousel
	// 	Herobanner
	// 	Tabs
	// */
});
