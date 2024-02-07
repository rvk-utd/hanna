//@ts-check
/* eslint-env es2022 */

import { getPkgVersion } from '../../../build-helpers.mjs';

/** @type {import('../../../build-helpers.mjs').PkgVersionCfg} */
export const serverPkgConfig = {
  pkgJsonSuffix: '-server',
  changelogSuffix: '-server',
  versionKey: 'cssVersion',
  offerDateShift: true,
};

export const serverFolder = '../../servers/styles/';
export const publicFolder = `${serverFolder}public/`;

export const assetsDistFolder = `${publicFolder}assets/`;
export const devDistCssFolder = `${publicFolder}css/dev/`;

/**
 * @returns {Promise<{
 *   fullCssVersion: string;
 *   cssFolderVersion: string;
 *   majorCssVersion: string;
 * }>}
 */
export const getCssVersionConfig = async () => {
  const fullCssVersion = await getPkgVersion(serverPkgConfig);

  /** Skip the patch version  */
  const cssFolderVersion = fullCssVersion.match(/^\d+\.\d+/)?.[0];
  if (!cssFolderVersion) {
    throw new Error('Missing/invalid pkg.cssVersion');
  }
  const majorCssVersion =
    (cssFolderVersion.match(/^(?:0\.\d+|[1-9]\d*)/) || [''])[0] || '';

  return {
    fullCssVersion,
    cssFolderVersion,
    majorCssVersion,
  };
};
