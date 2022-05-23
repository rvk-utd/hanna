const { execSync } = require('child_process');
const { compileCSSFromJS } = require('es-in-css/compiler');
const esbuild = require('esbuild');
const { dtsPlugin } = require('esbuild-plugin-d.ts');
const { sync: glob } = require('glob');

const rootPkg = require('../../package.json');

const { devDistCssFolder } = require('./scripts/config');
const pkg = require('./package.json');
const {
  makePackageJson,
  opts,
  writeOnlyAffected,
  exit1,
  isNewFile,
} = require('../../build-utils');

// ---------------------------------------------------------------------------

const testsDir = '__tests/';
const outdirLib = '_npm-lib/';
const outdirCss = devDistCssFolder;

const baseOpts = {
  bundle: true,
  platform: 'node',
  target: ['node16'],
  format: 'cjs',
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
    ...Object.keys(rootPkg.dependencies || {}),
    ...Object.keys(rootPkg.devDependencies || {}),
  ],
  watch: opts.dev,
};

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
    `cp README-npmlib.md ${outdirLib}README.md`,
    `cp CHANGELOG-npmlib.md ${outdirLib}CHANGELOG.md`,
  ].join(' && ')
);
makePackageJson(pkg, outdirLib);

// -------------------

const buildLib = (format, extraCfg) =>
  esbuild.build({
    ...baseOpts,
    platform: 'node',
    format,
    entryPoints: ['src/lib/index.ts'],
    outExtension: format === 'esm' ? { '.js': '.mjs' } : undefined,
    outdir: outdirLib,
    define: {
      'process.env.NPM_PUB': JSON.stringify(true), // strips out all local-dev-only code paths
    },
    ...extraCfg,
  });

buildLib('esm', { plugins: [dtsPlugin({ outDir: outdirLib + 'types/' })] }).catch(exit1);
buildLib('cjs').catch(exit1);

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
