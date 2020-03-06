const o = require('ospec');
const { existsSync, rmdirSync } = require('fs');
const glob = require('glob').sync;
const { cssVersion, publishFolder } = require('./config');

require('./dev.tests.js');

o.spec('Publishing', () => {
	o('package has a valid CSS version', () => {
		o(cssVersion != null).equals(true);
		o(/^v\d+\.\d+/.test(cssVersion)).equals(true); // Technically redundant, but hey!
	});

	o('no CSS folder exists for the current CSS version', () => {
		let cssFolderDoesntExist = !existsSync(publishFolder);
		if (!cssFolderDoesntExist && glob(publishFolder + '/*').length === 0) {
			try {
				rmdirSync(publishFolder);
				cssFolderDoesntExist = true;
			} catch (e) {
				console.error(e);
			}
		}
		o(cssFolderDoesntExist).equals(true);
	});
});
