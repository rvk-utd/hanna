//@ts-check
import { logError, logThenExit1, shell$ } from '@maranomynet/libtools';
import { mkdir, writeFile } from 'fs/promises';
import { globSync } from 'glob';

import { buildAndRunTests, esbuild, isDev, srcDir } from '../../build-helpers.mjs';

import { getServerConfig } from './build-config.mjs';

(async () => {
  const { distFolder, sprinklesFolder, version, versionFolder } = await getServerConfig();

  if (isDev) {
    await buildAndRunTests();
    shell$(
      `NODE_ENV=development  yarn run vite build --logLevel warn --force --watch`,
      logError
    );
    shell$(`yarn run http-server ./ -c-1 -p1337 -o examples/`, logError);
  } else {
    await buildAndRunTests();
    await shell$(`yarn run vite build`);
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
    const fallbackSprinklesUrl = isDev
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
      minify: !isDev,
      entryPoints: globSync(`${srcDir}/index.{js,mjs,ts}`),
      write: false,
      watch: isDev && {
        onRebuild: (err, results) => results && replaceTokens(results, err),
      },
      outdir: distFolder,
    })
    .then(replaceTokens)
    .catch(logThenExit1);

  // ---------------------------------------------------------------------------
})();
