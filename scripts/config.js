const pkg = require('../package.json');

const cssVersion = 'v' + (pkg.version.match(/^0\.\d+/) || [pkg.version])[0];
const distFolder = 'public/';
const sourceFolder = 'src/';

module.exports = {
	cssVersion,
	sourceFolder,
	distFolder,
	assetsDistFolder: distFolder + 'assets/',
	devDistCssFolder: distFolder + 'css/dev/',
	publishCssFolder: distFolder + 'css/' + cssVersion,
	publishDevCssFolder: distFolder + 'css/dev-' + cssVersion.split('.')[0],
};
