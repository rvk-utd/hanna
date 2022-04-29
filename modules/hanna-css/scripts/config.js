const pkg = require('../package-server.json');

const cssVersion = 'v' + (pkg.cssVersion.match(/^0\.\d+/) || [pkg.cssVersion])[0];
const serverFolder = '../../style-server/';
const publicFolder = serverFolder + 'public/';
const sourceFolder = 'src/';

const assetsDistFolder = publicFolder + 'assets/';
const devDistCssFolder = publicFolder + 'css/dev/';
const publishCssFolder = publicFolder + 'css/' + cssVersion;
const publishDevCssFolder = publicFolder + 'css/dev-' + cssVersion.split('.')[0];

module.exports = {
  assetsDistFolder,
  cssVersion,
  devDistCssFolder,
  publicFolder,
  serverFolder,
  publishCssFolder,
  publishDevCssFolder,
  sourceFolder,
};
