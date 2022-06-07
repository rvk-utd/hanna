/* eslint-env es2022 */
import { execSync } from 'child_process';
import esbuild from 'esbuild';
import { readFile } from 'fs/promises';
import globPkg from 'glob';

import { exit1, makePackageJson, opts, writeOnlyAffected } from '../../build-helpers.mjs';

const glob = globPkg.sync;

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

const srcDir = 'src/';
const testsDir = '__tests/';
const distDir = '_npm-lib/';

const allDeps = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
  ...Object.keys(rootPkg.dependencies || {}),
  ...Object.keys(rootPkg.devDependencies || {}),
];
const externalDeps = allDeps.filter((name) => !name.startsWith('@reykjavik/hanna-'));

//
// ---------------------------------------------------------------------------
// Build Unit Tests

execSync(`rm -rf ${testsDir} && mkdir ${testsDir}`);

// -------------------

esbuild
  .build({
    format: 'cjs',
    bundle: true,
    external: externalDeps,
    platform: 'node',
    target: ['node16'],
    entryPoints: glob(`${srcDir}**/*.tests.{js,ts,tsx}`),
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
    `rm -rf ${distDir}`,
    `mkdir ${distDir}`,
    `cp README.md ${distDir}`,
    `cp CHANGELOG.md ${distDir}`,
  ].join(' && ')
);
makePackageJson(pkg, distDir, {
  exports: glob('*.{ts,tsx}', { cwd: srcDir, ignore: '*.tests.{ts,tsx}' }).reduce(
    (exports, file) => {
      const token = file.replace(/\.tsx?$/, '');
      const expToken = token === 'index' ? '.' : token;
      exports[expToken] = {
        types: `./types/${token}.d.ts`,
        import: `./lib/${token}.mjs`,
        require: `./lib/${token}.cjs`,
      };
      return exports;
    },
    {}
  ),
});

// -------------------

const buildLib = (format) =>
  esbuild.build({
    bundle: false,
    format,
    platform: 'node',
    mainFields: ['module', 'main'],
    target: ['node16'],
    entryPoints: glob(`${srcDir}**/*.{ts,tsx}`, { ignore: '*.tests.{ts,tsx}' }),
    outExtension: { '.js': format === 'esm' ? '.mjs' : '.cjs' },
    outdir: `${distDir}lib`,
    define: {
      'process.env.NPM_PUB': JSON.stringify(true), // strips out all local-dev-only code paths
    },
    watch: opts.dev,
  });

// TODO: Explore writing pkg.exports
buildLib('esm').catch(exit1);
buildLib('cjs').catch(exit1);

if (!opts.dev) {
  execSync(
    [
      `yarn run -T tsc --project tsconfig.lib.json`,
      `cp -R _temp-types/hanna-react/src ${distDir}types`,
      `rm -rf _temp-types`,
    ].join(' && ')
  );
}
