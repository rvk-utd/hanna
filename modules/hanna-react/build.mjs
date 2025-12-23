//@ts-check
import { buildAndRunTests, buildNpmLib } from '../../build-helpers.mjs';

(async () => {
  await buildAndRunTests();
  await buildNpmLib('react', {
    sideEffects: ['**/focus-visible.js'],
  });
})();
