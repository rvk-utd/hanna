const pkg = require('../package.json');

const cssVersion = (pkg.version.match(/^\d+\.\d+/) || [])[0];
const devVersion = 'canary';
const distFolder = 'public/css/';

module.exports = {
	cssVersion,
	cssSourceFolder: 'src/',
	devDistFolder: distFolder + '/' + devVersion,
	publishFolder: distFolder + '/' + cssVersion,
};
