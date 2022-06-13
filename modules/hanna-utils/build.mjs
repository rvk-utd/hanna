import { buildNpmLib, buildTests } from '../../build-helpers.mjs';

buildTests();
buildNpmLib('utils', {
  sideEffects: ['**/focus-visible.js'],
});
