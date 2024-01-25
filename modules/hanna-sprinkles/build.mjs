//@ts-check
/* eslint-env es2022 */
import { mkdir, writeFile } from 'fs/promises';
import { globSync } from 'glob';

import {
  $,
  buildAndRunTests,
  esbuild,
  logError,
  logThenExit1,
  opts,
  srcDir,
} from '../../build-helpers.mjs';

import { getServerConfig } from './build-config.mjs';

const { distFolder, sprinklesFolder, version, versionFolder } = await getServerConfig();

if (opts.dev) {
  await buildAndRunTests();
  $(`NODE_ENV=development  yarn run vite build --logLevel warn --force --watch`).catch(
    logError
  );
  $(`yarn run http-server ./ -c-1 -p1337 -o examples/`).catch(logError);
} else {
  await buildAndRunTests();
  await $(`yarn run vite build`);
}

// ===========================================================================

/**
 * @param {esbuild.BuildResult} res
 * @param {unknown} [err]
 */
const replaceTokens = (res, err) => {
  if (err) {
    return;
  }
  const fallbackSprinklesUrl = opts.dev
    ? '__REMOVE__"new URL("/dist/", document.location.href)"__REMOVE__' // hack to dynamically get the correct host in dev
    : `https://styles.reykjavik.is/${sprinklesFolder + versionFolder}/`;

  return mkdir(distFolder, { recursive: true }).then(() =>
    Promise.all(
      res.outputFiles?.map((file) =>
        writeFile(
          file.path,
          file.text
            .replace(/\${fallbackSprinklesUrl}/g, fallbackSprinklesUrl)
            .replace(/['"]__REMOVE__['"]/g, '')
            .replace(/\${version}/g, version)
        )
      ) || []
    )
  );
};

// Only build the index.js loader/setup file
// This is easier than to trick Vite into not bundling it
// in with the other, code-split sprinkle files.
await esbuild
  .build({
    bundle: true,
    format: 'iife',
    minify: !opts.dev,
    entryPoints: globSync(`${srcDir}/index.{js,mjs,ts}`),
    write: false,
    watch: !!opts.dev && {
      onRebuild: (err, results) => results && replaceTokens(results, err),
    },
    outdir: distFolder,
  })
  .then(replaceTokens)
  .catch(logThenExit1);

// ---------------------------------------------------------------------------
