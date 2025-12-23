//@ts-check
import iconfontTaskFactory from '@hugsmidjan/gulp-iconfont';
import imagesTaskFactory from '@hugsmidjan/gulp-images';
import { writeFileSync } from 'fs';
import gulp from 'gulp';

import { srcDir } from '../../../build-helpers.mjs';

import { assetsDistFolder, devDistCssFolder } from './config.mjs';

// ---------------------------------------------------------------------------

const cssImages = imagesTaskFactory({
  name: 'cssImages',
  src: srcDir,
  dist: devDistCssFolder,
  // glob: ['i/**/*', '!i/_raw/**'],
});

const iconfont = iconfontTaskFactory({
  name: 'iconfont',
  src: srcDir,
  dist: `${devDistCssFolder}i/`,
  // glob: 'iconfont/*.svg',
  onGlyphs: (glyphs) => {
    const icons = Object.fromEntries(
      glyphs.map(({ name, unicode }) => [
        // Map "-" in filenames to underscores for easier use as JavaScript props
        `icon__${name.replace(/-/g, '_')}`,
        unicode[0],
      ])
    );
    writeFileSync(
      `${srcDir}/lib/iconfonttokens.ts`,
      [
        `// This file is auto-generated. DO NOT EDIT!`,
        ``,
        `export default ${JSON.stringify(icons, null, 2)}`,
        ``,
      ].join('\n')
    );
  },
});

const staticAssets = imagesTaskFactory({
  name: 'assets',
  src: `${srcDir}/assets/`,
  dist: assetsDistFolder,
  // svgoRules: { inlineStyles: true },
  // NOTE: The task simply copies over any file-types
  // it doesn't recognize as compressible images.
  glob: ['**/*', '!_raw/**'],
});

// ===========================================================================

// (Imported by build.mjs and called+awaited)
export const buildIconfont = iconfont.bundle;
export const compressCssImages = cssImages.compress;
export const compressStaticAssets = staticAssets.compress;

// Used by gulp
export const watch = gulp.parallel(
  // staticAssets.watch, // <-- Uncomment when needed
  cssImages.watch,
  iconfont.watch
);
