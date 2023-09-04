//@ts-check
import { buildNpmLib, buildTests } from '../../build-helpers.mjs';

buildTests();
buildNpmLib('react', {
  sideEffects: ['**/focus-visible.js'],
});
