const pkg = require('../package-server.json');

const cssVersion = (pkg.cssVersion.match(/^0\.\d+/) || [pkg.cssVersion])[0];
if (!cssVersion) {
  throw new Error('Missing pkg.cssVersion');
}
const majorCssVersion = (cssVersion.match(/^(?:0\.\d+|[1-9]\d*)/) || [''])[0] || '';

const serverFolder = '../../servers/styles/';
const publicFolder = serverFolder + 'public/';
const sourceFolder = 'src/';

const assetsDistFolder = publicFolder + 'assets/';
const devDistCssFolder = publicFolder + 'css/dev/';
const publishCssFolder = publicFolder + 'css/v' + cssVersion;
const publishDevCssFolder = publicFolder + 'css/dev-v' + majorCssVersion;

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
