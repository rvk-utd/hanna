//@ts-check
import { sync as glob } from 'glob';

import { esbuildBuild } from '../../build-helpers.mjs';

esbuildBuild(glob('src/tests/*.ts'), './tests', {
  watch: false,
  emptyOutdir: false,
  typeCheck: false,
});
