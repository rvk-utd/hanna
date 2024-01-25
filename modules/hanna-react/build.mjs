//@ts-check
/* eslint-env es2022 */
import { buildAndRunTests, buildNpmLib } from '../../build-helpers.mjs';

await buildAndRunTests();
await buildNpmLib('react', {
  sideEffects: ['**/focus-visible.js'],
});
