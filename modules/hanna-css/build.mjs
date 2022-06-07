/* eslint-env es2022 */
import { execSync } from 'child_process';
import { compileCSSFromJS } from 'es-in-css/compiler';
import esbuild from 'esbuild';
import { readFile } from 'fs/promises';
import globPkg from 'glob';

import {
  exit1,
  isNewFile,
  makePackageJson,
  opts,
  writeOnlyAffected,
} from '../../build-helpers.mjs';

import { devDistCssFolder } from './scripts/config.js';

const glob = globPkg.sync;

const [rootPkg, pkg] = (
  await Promise.all([readFile('../../package.json'), readFile('./package.json')])
).map((str) => JSON.parse(str));

// ---------------------------------------------------------------------------

const testsDir = '__tests/';
const outdirLib = '_npm-lib/';
const outdirCss = devDistCssFolder;

const baseOpts = {
  bundle: true,
  platform: 'node',
  target: ['node16'],
  format: 'cjs',
  watch: opts.dev,
};
const allDeps = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
  ...Object.keys(rootPkg.dependencies || {}),
  ...Object.keys(rootPkg.devDependencies || {}),
];
const externalDeps = allDeps.filter((name) => !name.startsWith('@reykjavik/hanna-'));

// ---------------------------------------------------------------------------
// Always start by building the iconfont

if (!opts.onlyLib) {
  execSync(`rm -rf ${outdirCss}  &&  mkdir ${outdirCss}`);
}
execSync(`yarn run gulp iconfont`);

//
// ---------------------------------------------------------------------------
// Build Unit Tests

execSync(`rm -rf ${testsDir} && mkdir ${testsDir}`);

// -------------------

esbuild
  .build({
    ...baseOpts,
    external: externalDeps,
    entryPoints: glob('src/**/*.tests.ts'),
    entryNames: '[dir]/[name]--[hash]',
    write: false,
    watch: opts.dev && {
      onRebuild: (err, results) => writeOnlyAffected(results, err),
    },
    outdir: testsDir,
  })
  .then(writeOnlyAffected)
  .catch(exit1);

//
// ---------------------------------------------------------------------------
// Build Library

execSync(
  [
    `rm -rf ${outdirLib}`,
    `mkdir ${outdirLib}`,
    `cp README-lib.md ${outdirLib}README.md`,
    `cp CHANGELOG-lib.md ${outdirLib}CHANGELOG.md`,
  ].join(' && ')
);
makePackageJson(pkg, outdirLib, {
  types: 'types/index.d.ts',
  main: 'index.js',
  module: 'index.mjs',
});

// -------------------

const buildLib = (format) =>
  esbuild.build({
    ...baseOpts,
    external: allDeps,
    platform: 'node',
    format,
    entryPoints: ['src/lib/index.ts'],
    outExtension: format === 'esm' ? { '.js': '.mjs' } : undefined,
    outdir: outdirLib,
    define: {
      'process.env.NPM_PUB': JSON.stringify(true), // strips out all local-dev-only code paths
    },
  });

buildLib('esm').catch(exit1);
buildLib('cjs').catch(exit1);

if (opts.onlyLib && !opts.dev) {
  execSync(
    [
      `yarn run -T tsc --project tsconfig.lib.json`,
      `cp -R _temp-types/hanna-css/src/lib ${outdirLib}types`,
      `rm -rf _temp-types`,
    ].join(' && ')
  );
}

// ---------------------------------------------------------------------------

if (!opts.onlyLib) {
  //
  // ---------------------------------------------------------------------------
  // Build CSS/SCSS files

  const toCSSSources = (res) =>
    res.outputFiles
      .filter(isNewFile)
      .map((res) => ({ fileName: res.path, content: res.text }));

  const cssCompile = (results) =>
    compileCSSFromJS(toCSSSources(results), {
      outbase: 'src/css',
      outdir: outdirCss,
      redirect: (outFile) => outFile.replace(/\/\$\$.+?\$\$-/, '/'),
      minify: process.env.NODE_ENV === 'production',
      prettify: process.env.NODE_ENV !== 'production',
    });

  esbuild
    .build({
      ...baseOpts,
      external: externalDeps,
      entryPoints: glob('src/css/**/*.css.ts'),
      entryNames: '[dir]/$$[hash]$$-[name]',
      outbase: 'src/css',
      outdir: 'src/css',
      write: false,
      watch: opts.dev && {
        onRebuild: (error, results) => {
          if (!error) {
            cssCompile(results);
          }
        },
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      },
    })
    .then(cssCompile)
    // FIXME: cleanup temporary .js files on error
    .catch(exit1);

  // -------------------

  const scssCompile = (results) =>
    compileCSSFromJS(toCSSSources(results), {
      ext: 'scss',
      redirect: (outFile) => outFile.replace(/\/\$\$.+?\$\$-/, '/'),
      banner: '// This file is auto-generated. DO NOT EDIT!\n',
    });

  esbuild
    .build({
      ...baseOpts,
      external: externalDeps,
      entryPoints: glob('src/css/**/*.scss.ts'),
      entryNames: '[dir]/$$[hash]$$-[name]',
      outbase: 'src/css',
      outdir: 'src/css',
      watch: opts.dev && {
        onRebuild: (error, results) => {
          if (!error) {
            return scssCompile(results);
          }
        },
      },
      write: false,
    })
    .then(scssCompile)
    // FIXME: cleanup temporary .js files on error
    .catch(exit1);
}
