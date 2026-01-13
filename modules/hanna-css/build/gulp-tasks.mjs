//@ts-check
import imagesTaskFactory from '@hugsmidjan/gulp-images';
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
export const compressCssImages = cssImages.compress;
export const compressStaticAssets = staticAssets.compress;

// Used by gulp
export const watch = gulp.parallel(
  // staticAssets.watch, // <-- Uncomment when needed
  cssImages.watch
);
