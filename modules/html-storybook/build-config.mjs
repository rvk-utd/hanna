/* eslint-env es2022 */
import { readFile } from 'fs/promises';

export const rootFolder = '../../';

const pkg = JSON.parse(await readFile(rootFolder + 'package.json'));

export const htmlVersion = pkg.version;
// Only use the MAJOR + MINOR version
export const htmlVersionFolder = htmlVersion.split('.').slice(0, 2).join('.');

export const serverFolder = rootFolder + 'servers/docs/';
export const htmlDocsFolder = serverFolder + 'public/html/';

export const tempDistFolder = '_temp-dist';
