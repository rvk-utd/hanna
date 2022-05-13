const { execSync } = require('child_process');
const { compileCSSFromJS } = require('es-in-css/compiler');
const esbuild = require('esbuild');
const { dtsPlugin } = require('esbuild-plugin-d.ts');
const { writeFileSync } = require('fs');
const { sync: glob } = require('glob');

const rootPkg = require('../../package.json');

const { devDistCssFolder, serverFolder } = require('./scripts/config');
const pkg = require('./package.json');
const { writeFile, access, mkdir } = require('fs/promises');
const { dirname } = require('path');

// ---------------------------------------------------------------------------

const makePackageJson = (outdir) => {
  const pkgOverloads = pkg.npm_lib_package_json;
  const newPkg = { ...pkg };
  delete newPkg.npm_lib_package_json;

  delete newPkg.scripts;
  delete newPkg.hxmstyle;
  delete newPkg.private;
  delete newPkg.devDependencies;
  Object.assign(newPkg, pkgOverloads);

  writeFileSync(outdir + 'package.json', JSON.stringify(newPkg, null, '\t'));
};

// ===========================================================================

const opts = process.argv.slice(2).reduce(
  /* <Record<string,unknown>> */ (map, arg) => {
    const [key, value] = arg.replace(/^-+/, '').split('=');
    map[key] = value == null ? true : value;
    return map;
  },
  {}
);

// ---------------------------------------------------------------------------

const fileMem = {};
const newFile = ({ path }) => {
  if (path in fileMem) {
    return false;
  }
  fileMem[path] = true;
  return true;
};

const exit1 = (err) => {
  console.error(err);

  process.exit(1);
};

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
  define: {
    // Set this variable to signify when
    'process.env.NPM_PUB': JSON.stringify(process.env.NPM_PUB),
  },
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

const writeTestFiles = (res) =>
  res.outputFiles.filter(newFile).forEach((res) => {
    const targetDir = dirname(res.path);
    return access(targetDir)
      .catch(() => mkdir(targetDir, { recursive: true }))
      .then(() => writeFile(res.path, res.text));
  });

esbuild
  .build({
    ...baseOpts,
    entryPoints: glob('src/**/*.tests.ts'),
    entryNames: '[dir]/[name]--[hash]',
    write: false,
    watch: opts.dev && {
      onRebuild: (err, results) => {
        if (!err) {
          writeTestFiles(results);
        }
      },
    },
    outdir: testsDir,
  })
  .then(writeTestFiles)
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
makePackageJson(outdirLib);

// -------------------

const buildLib = (format, extraCfg) =>
  esbuild.build({
    ...baseOpts,
    platform: 'node',
    format,
    entryPoints: ['src/lib/index.ts'],
    outExtension: format === 'esm' ? { '.js': '.mjs' } : undefined,
    outdir: outdirLib,
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
      .filter(newFile)
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
