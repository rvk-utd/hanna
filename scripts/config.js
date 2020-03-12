const pkg = require('../package.json');

const cssVersion = 'v' + (pkg.version.match(/^\d+\.\d+/) || [''])[0];
const distFolder = 'public/';
const sourceFolder = 'src/';

module.exports = {
	cssVersion,
	sourceFolder,
	devDistCssFolder: distFolder + 'css/dev/',
	publishCssFolder: distFolder + 'css/' + cssVersion,
	assetsDistFolder: distFolder + 'assets/',
};
