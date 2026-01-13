//@ts-check
import { logError, logThenExit1, shell$ } from '@maranomynet/libtools';
import { compileCSSFromJS } from 'es-in-css/compiler';
import { sync as globSync } from 'glob';

import { esbuild, getExternalDeps, isDev, srcDir } from '../../../build-helpers.mjs';

import { devDistCssFolder } from './config.mjs';
import { compressCssImages } from './gulp-tasks.mjs';

// ===========================================================================

export const handlError = isDev ? logError : logThenExit1;

// ===========================================================================

const cssSrcDir = `${srcDir}/css`;
const cssSourceExtension = '.css.ts';
const cssModuleFiles = globSync(`**/*${cssSourceExtension}`, { cwd: cssSrcDir });

/**
 * @param {string|undefined} NODE_ENV
 * @returns {Promise<void>}
 */
export const buildCssFiles = async (NODE_ENV) => {
  await shell$(`rm -rf ${devDistCssFolder}  &&  mkdir ${devDistCssFolder}`);
  await compressCssImages().catch(handlError);

  /** @type {Record<string, boolean>} */
  let fileMem = {};
  /**
   * @param {NonNullable<import('esbuild').BuildResult['outputFiles']>} resOutputFiles
   * @returns {Array<{ fileName: string, content: string }>}
   */
  const toCSSSources = (resOutputFiles) => {
    const outputfiles = resOutputFiles
      .filter(({ path }) => !fileMem[path])
      .map((res) => ({ fileName: res.path, content: res.text }));
    fileMem = {};
    outputfiles.forEach(({ fileName }) => {
      fileMem[fileName] = true;
    });
    return outputfiles;
  };

  /**
   * @param {import('esbuild').BuildResult} results
   */
  const cssCompile = (results) =>
    compileCSSFromJS(toCSSSources(results.outputFiles || []), {
      outbase: cssSrcDir,
      outdir: devDistCssFolder,
      redirect: (outFile) => outFile.replace(/\/\$\$.+?\$\$-/, '/'),
      minify: NODE_ENV === 'production',
      prettify: NODE_ENV !== 'production',
      nested: { rootRuleName: 'escape' },
    });

  const external = await getExternalDeps();

  await esbuild
    .build({
      bundle: true,
      platform: 'node',
      target: ['node16'],
      format: 'cjs',
      external,
      entryPoints: cssModuleFiles.map((file) => `${cssSrcDir}/${file}`),
      entryNames: '[dir]/$$[hash]$$-[name]',
      outbase: cssSrcDir,
      outdir: cssSrcDir,
      write: false,
      watch: isDev && {
        onRebuild: (error, results) => {
          if (results && !error) {
            cssCompile(results).catch(handlError);
          }
        },
      },
      define: { 'process.env.NODE_ENV': JSON.stringify(NODE_ENV) },
    })
    .then((res) => {
      if (isDev) {
        process.on('exit', () => {
          res.stop?.();
        });
      }
      return cssCompile(res);
    })
    .catch(handlError);
};
