//@ts-check
/* eslint-env es2022 */

import { getPkgVersion, updatePkgVersion } from '@maranomynet/libtools';

export const bumpVersion = () => updatePkgVersion({ offerDateShift: true });

export const getServerConfig = async () => {
  const version = await getPkgVersion();
  // const versionFolder = (version.match(/^0\.\d+/) || [version])[0];
  const versionFolder = `v${(version.match(/^\d+.\d+/) || [''])[0]}`;
  if (versionFolder === 'v') {
    console.error('pkg.version number invalid or missing:', version);
    process.exit(1);
  }
  const sprinklesFolder = `sprinkles/`;
  const serverPath = `../../servers/styles/`;
  const sprinklesPath = `${serverPath}public/${sprinklesFolder}`;
  const sprinklesVersionPath = sprinklesPath + versionFolder;

  const distFolder = './dist/';

  return {
    version,
    versionFolder,
    sprinklesFolder,

    serverPath,
    sprinklesPath,
    sprinklesVersionPath,

    distFolder,
  };
};
