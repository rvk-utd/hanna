// @ts-check
import preact from '@preact/preset-vite';
import { transform } from 'esbuild'; // local version installed by Vite.
import { sync as globSync } from 'glob';
import { resolve } from 'path';
import { defineConfig } from 'vite';

import { srcDir, testGlobs } from '../../build-helpers.mjs';

const distDir = 'dist/';

const scriptsGlobs = `${srcDir}/**/*.{ts,tsx}`;
const ignore = [
  // The index (namespace init) file is not an entry point
  // and is built separately by `build.mjs`
  `${srcDir}index.{ts,tsx}`,
  // declaration files
  `${srcDir}**/*.d.ts`,
  // Dummy partials. No entry points should start with "_"
  `${srcDir}**/_*.{ts,tsx}`,
  // test files
  testGlobs,
  // `*.privates.js` contain private bits that need testing
  `${srcDir}**/*.privates.{ts,tsx}`,
];

const stripExt = (/** @type {string} */ path) => path.replace(/\.[^.]+$/, '');
// const onlyFileName = (path) => path.split('/').pop();

/**  @typedef {{ [fileName:string]: string }} InputMap */
const makeInputMap = (/** @type {Array<string>} */ files) /*: InputMap */ =>
  files.reduce(
    (inputMap, fileName) => {
      const outToken = stripExt(fileName).slice(srcDir.length);
      inputMap[outToken] = fileName;
      return inputMap;
    },
    /** @type {InputMap} */ {}
  );

export const scriptsBundleMap = makeInputMap(globSync(scriptsGlobs, { ignore }));

const emptyOutDir = process.env.NODE_ENV === 'production';
const minify = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Use preact instead of React
    preact(),
    // Add custom esm minification plugin, because vite will not let us minify
    // es libraries at the moment, for ...err... obscure reasons.
    // https://github.com/vitejs/vite/issues/5167
    {
      name: 'minifyEs',
      renderChunk: {
        order: 'post',
        async handler(code, chunk, outputOptions) {
          if (outputOptions.format === 'es' && minify) {
            return await transform(code, { minify: true });
          }
          return code;
        },
      },
    },
  ],
  resolve: {
    alias: {
      '@reykjavik/hanna-utils': resolve(__dirname + '/../hanna-utils/src'),
      '@reykjavik/hanna-react': resolve(__dirname + '/../hanna-react/src'),
      '@reykjavik/hanna-css': resolve(__dirname + '/../hanna-css/src/lib'),
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) ?? 'undefined',
  },
  build: {
    emptyOutDir,
    lib: {
      entry: scriptsBundleMap,
      formats: [
        'es',
        // @ts-expect-error
        'system',
      ],
      fileName(format, entryName) {
        const folder = { es: 'esm', system: 'systemjs' }[format] || 'other';
        return `${folder}/${entryName}.js`;
      },
    },
    minify,
    rollupOptions: {
      treeshake: {
        preset: 'safest',
        moduleSideEffects: (id, external) =>
          !external || /\/(?:initHannaNamespace|focus-visible)\.(?:mjs|js|ts)?/.test(id),
      },

      output: {
        dir: distDir,
        chunkFileNames: '_chunks/[name]-[hash].js',

        manualChunks(id) {
          const module = id.split(/(?:node_modules|hanna-sprinkles)\//)[1] || id;
          // console.log(module);

          if (module.startsWith('@hugsmidjan/qj')) {
            return 'qj';
          }
          if (module.startsWith('src/utils/_')) {
            return 'utils';
          }
          if (/(?:_Link|_Button)$/.test(module)) {
            return 'components';
          }
          // if (module.startsWith('preact')) {
          //   return 'preact';
          // }
        },
      },
    },
  },
});
