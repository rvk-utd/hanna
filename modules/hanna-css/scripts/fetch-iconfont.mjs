//@ts-check
/*
  # Script to update the iconfont.

  We use Google's Material Icons Rounded icon font, but only a subset of icons.

  This script:
  - reads the "accepted" icon names from `icon-names.txt`
  - fetches the corresponding CSS from Google Fonts
  - parses out the font URL from the @font-face rule
  - downloads the .woff file and saves it locally.

  Before running this script, make sure to update `icon-names.txt` with the
  desired icon names from the Figma design file "Icon Library".
  https://www.figma.com/design/JZNwAUzIgLa6H1td8jIn34/Hanna-Icons?node-id=3440-77&m=dev
  (The figma file should contain a text box with all the icon names used in the design.)

  To run this script:

  ```sh
  cd modules/hanna-css
  yarn run iconfont
  ```
*/

import { readFileSync, writeFileSync } from 'fs';
import fetch from 'node-fetch';

const iconNamesRaw = readFileSync('./scripts/figma-icon-names.txt', 'utf-8');
const iconNamesAll = iconNamesRaw
  .trim()
  .replace(/,/g, '\n')
  .replace(/\s\s+/gm, '\n')
  .split('\n')
  .sort()
  .filter((name, index, arr) => name !== arr[index - 1]); // dedupe

writeFileSync(
  './src/iconfontTokens.ts',
  '// This file is auto-generated. DO NOT EDIT!\n\n' +
    `export const _iconTokenList = [\n` +
    `  '${iconNamesAll.join("',\n  '")}'\n` +
    `] as const;\n\n` +
    `export type IconToken = (typeof _iconTokenList)[number];\n`,
  'utf-8'
);

writeFileSync('./src/i/iconfont.json', JSON.stringify(iconNamesAll, null, 2), 'utf-8');

const iconNames = iconNamesAll
  .map((name) => name.replace(/_filled$/, ''))
  .sort()
  .filter((name, index, arr) => name !== arr[index - 1]);

const fontCssUrl = `https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,FILL@20..48,0..1&icon_names=${encodeURI(
  iconNames.join(',')
)}`;

console.info('\nFetching iconfont CSS from:\n', fontCssUrl);

const cssRes = await fetch(fontCssUrl, {
  headers: {
    'User-Agent':
      // important: Google cooks up different fontUrl based on User-Agent.
      // This Firefox (v146) UA delivers a .woff2 url() that works in Chrome(ium)
      // and Safari too.
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:147.0) Gecko/20100101 Firefox/147.0',
  },
});
if (!cssRes.ok) {
  throw new Error(`Failed to fetch iconfont CSS: ${cssRes.status} ${cssRes.statusText}`);
}

const cssText = await cssRes.text();

// Parse out the font URL from the CSS
const [_, fontUrl] = cssText.match(/(https:\/\/fonts\.gstatic\.com\/icon\/.*?)\)/m) || [];
if (!fontUrl) {
  throw new Error('Failed to parse font URL from CSS');
}

console.info('\nFetching iconfont from:\n', fontUrl);

const fontRes = await fetch(fontUrl);
if (!fontRes.ok) {
  console.warn(
    `\nFailed to fetch iconfont .woff2 programmatically`,
    `(${fontRes.status} ${fontRes.statusText}).`,
    '\nClick the link above to download in a browser and',
    'then save the file to ./src/i/iconfont.woff2'
  );
}

const fontData = await fontRes.arrayBuffer();

writeFileSync('./src/i/iconfont.woff2', Buffer.from(fontData));
console.info('\nIconfont .woff2 saved to ./src/i/iconfont.woff2\n');
