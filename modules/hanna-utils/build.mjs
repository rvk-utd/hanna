import { execSync } from 'child_process';
import esbuild from 'esbuild';
import { dtsPlugin } from 'esbuild-plugin-d.ts';
import { readFile } from 'fs/promises';
import globPkg from 'glob';

import { exit1, makePackageJson, opts, writeOnlyAffected } from '../../build-utils.js';

const { sync: glob } = globPkg;

const [rootPkg, pkg] = (
  await Promise.all([readFile('../../package.json'), readFile('./package.json')])
).map((str) => JSON.parse(str));

// // Copied over from the old build-configs.js
// const ignoreGlobs = {
//   stories: '**/*.stories.{js,ts,tsx}',
//   abscractComponents: 'components/abstract/**/*.{js,ts,tsx}',
//   declarations: '**/*.d.ts',
//   dummyPartials: '**/_*.{js,ts,tsx}', // No entry points should start with "_"
//   indexFiles: '**/index.{js,ts}', // o_O
//   tests: testGlobs,
//
//   testHelpers: '__testing/**/*.{js,ts,tsx}',
//   privates: '**/*.privates.{js,ts,tsx}', // `*.privates.js` contain private bits that need testing
//   wip: '**/*.WIP.{js,ts,tsx}', // Scripts that should not be bundled/published yet
// };

// ---------------------------------------------------------------------------

const testsDir = '__tests/';
const distDir = '_npm-lib/';
const srcDir = 'src/';

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

//
// ---------------------------------------------------------------------------
// Build Unit Tests

execSync(`rm -rf ${testsDir} && mkdir ${testsDir}`);

// -------------------

esbuild
  .build({
    ...baseOpts,
    bundle: true,
    platform: 'node',
    target: ['node16'],
    entryPoints: glob(srcDir + '**/*.tests.{js,ts,tsx}'),
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

const libEntries = [
  'index.ts',
  'focus-visible.ts',
  'shareButtonsUtils.ts',
  'i18n.ts',
  'assets.ts',
].map((fileName) => srcDir + fileName);

execSync(
  [
    `rm -rf ${distDir}`,
    `mkdir ${distDir}`,
    `cp README.md ${distDir}README.md`,
    `cp CHANGELOG.md ${distDir}CHANGELOG.md`,
  ].join(' && ')
);
makePackageJson(pkg, distDir, {
  exports: libEntries.reduce((exports, file) => {
    const token = file.slice(srcDir.length).replace(/\.tsx?$/, '');
    exports[token] = {
      import: token + '.mjs',
      require: token + '.js',
    };
    return exports;
  }, {}),
});

// -------------------

const buildLib = (format, extraCfg) =>
  esbuild.build({
    ...baseOpts,
    platform: 'node',
    format,
    entryPoints: libEntries,
    outExtension: format === 'esm' ? { '.js': '.mjs' } : undefined,
    outdir: distDir,
    define: {
      'process.env.NPM_PUB': JSON.stringify(true), // strips out all local-dev-only code paths
    },
    ...extraCfg,
  });

buildLib('esm', { plugins: [dtsPlugin({ outDir: distDir })] }).catch(exit1);
buildLib('cjs').catch(exit1);
