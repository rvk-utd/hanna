//@ts-check
import { pkgJson } from '../../build-helpers.mjs';

const { version } = pkgJson;

export { version };

// const versionFolder = (version.match(/^0\.\d+/) || [version])[0];
export const versionFolder = `v${(version.match(/^\d+.\d+/) || [''])[0]}`;
if (versionFolder === 'v') {
  console.error('pkg.version number invalid or missing:', version);
  process.exit(1);
}
export const sprinklesFolder = `sprinkles/`;

export const serverPath = `../../servers/styles/`;
export const sprinklesPath = `${serverPath}public/${sprinklesFolder}`;
export const sprinklesVersionPath = sprinklesPath + versionFolder;

export const distFolder = './dist/';
