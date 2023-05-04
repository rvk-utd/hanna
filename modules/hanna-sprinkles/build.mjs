//@ts-check
import esbuild from 'esbuild';
import { writeFile } from 'fs/promises';
import { globSync } from 'glob';

import { buildTests, exit1, opts, srcDir } from '../../build-helpers.mjs';

import { distFolder, sprinklesFolder, version, versionFolder } from './build-config.mjs';

const replaceTokens = (/** @type {esbuild.BuildResult} */ res, /** unknown */ err) => {
  if (err) {
    return;
  }
  const isProd = process.env.NODE_ENV === 'production';

  const sprinklesUrl = isProd
    ? `https://styles.reykjavik.is/${sprinklesFolder + versionFolder}`
    : '/dist';

  return Promise.all(
    res.outputFiles?.map((file) =>
      writeFile(
        file.path,
        file.text
          .replace(/\${sprinklesUrl}/g, sprinklesUrl)
          .replace(/\${version}/g, version)
      )
    ) || []
  );
};

esbuild
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
  .catch(exit1);

// ---------------------------------------------------------------------------

buildTests();
