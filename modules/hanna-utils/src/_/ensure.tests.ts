import o from 'ospec';

import { ensurePosInt, PositiveInteger } from './ensure';

o.spec('ensurePosInt', () => {
  o('works', () => {
    o(ensurePosInt(1)).equals(1 as PositiveInteger);
    o(ensurePosInt('1')).equals(1 as PositiveInteger);
    o(ensurePosInt(10000)).equals(10000 as PositiveInteger);
    o(ensurePosInt(0)).equals(undefined);
    o(ensurePosInt(-1)).equals(undefined);
    o(ensurePosInt(1.1)).equals(undefined);
    o(ensurePosInt('Infinity')).equals(undefined);
    o(ensurePosInt('foobar')).equals(undefined);
    o(ensurePosInt('010')).equals(10 as PositiveInteger);
    o(ensurePosInt('1x')).equals(undefined);
  });
});
