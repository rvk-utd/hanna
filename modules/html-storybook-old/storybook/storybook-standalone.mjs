import storybook from '@storybook/react/standalone.js';

import { tempDistFolder } from '../build-config.mjs';

const port = parseInt(process.env.NODE_PORT || '') || 3000;
const outputDir = process.env.STORYBOOK_OUTPUT_DIR || tempDistFolder;
const configDir = process.env.STORYBOOK_CONFIG_DIR || 'storybook';
const staticDir = process.env.STORYBOOK_STATIC_DIR || [];

console.info('Storybook standalone config:');
console.info({ outputDir, configDir, NODE_ENV: process.env.NODE_ENV, staticDir });

storybook({
  mode: 'static',
  outputDir,
  staticDir,
  configDir,
  port,
});
