import { buildNpmLib, buildTests } from '../../build-helpers.mjs';

buildTests();
buildNpmLib('utils');
