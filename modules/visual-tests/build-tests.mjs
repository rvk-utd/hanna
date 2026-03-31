//@ts-check
import { shell$ } from '@maranomynet/libtools';
import { sync as glob } from 'glob';

import { esbuildBuild } from '../../build-helpers.mjs';

// Exit if localhost:4000 is already in use
await shell$([
  `if lsof -i :4000 >/dev/null 2>&1; then echo "\nError:\nPort 4000 is already in use.\nPlease free it and try again.\n" && exit 1; fi`,
]);

// Build test version of the CSS files that we're going to use in our visual tests.
// (NOTE: The test version has some extra back-compat tweaks for the outdated
// PlayWright browser we're using while the project is stuck in node@16).
// We mmay not need this anymore when we upgrade the project to use either a
// newer Node version or the Bun runtime.
await shell$([
  `echo "Building test version of the CSS..."`,
  `cd ../hanna-css/`,
  `NODE_ENV=production  VISUAL_TESTING=true  node build-css.mjs`,

  `echo "Building visual test specs..."`,
]);

esbuildBuild(glob('src/tests/*.ts'), './tests', {
  watch: false,
  emptyOutdir: false,
  typeCheck: false,
});
