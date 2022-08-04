/* eslint-env es2022 */
import { readFile } from 'fs/promises';

const pkg = JSON.parse(await readFile('../../package.json'));

// Only use the MAJOR + MINOR version
export const htmlVersion = pkg.version.split('.').slice(0, 2).join('.');

export const serverFolder = '../../servers/docs/';
export const htmlDocsFolder = serverFolder + 'public/html/';

export const tempDistFolder = '_temp-dist';
