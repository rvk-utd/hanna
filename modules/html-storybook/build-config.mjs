//@ts-check
/* eslint-env es2022 */
import { readFile } from 'fs/promises';

export const rootFolder = '../../';

/** @type {string} */
export const htmlVersion = JSON.parse(
  (await readFile(`${rootFolder}package.json`)).toString()
).version;

// Only use the MAJOR + MINOR version
export const htmlVersionFolder = htmlVersion.split('.').slice(0, 2).join('.');

export const serverFolder = `${rootFolder}servers/docs/`;
export const htmlDocsFolder = `${serverFolder}public/html/`;

export const tempDistFolder = 'storybook-static';
