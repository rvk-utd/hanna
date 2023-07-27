import { pct, px } from 'es-in-css';
import o from 'ospec';

import { between } from './between.js';

o.spec('between helper', () => {
  o('works', () => {
    o(between(16, 24, 320, 1368, '%')).equals(
      'calc(0.7633587786259541% + 13.557251908396948px)'
    )('supports %');

    o(between(16, 24, 320, 1368, 'vw')).equals(
      'calc(0.7633587786259541vw + 13.557251908396948px)'
    )('supports vw');

    o(between(16, 16, 320, 1368, '%')).equals('16px')(
      'returns bare intercept when slopeFactor is zero'
    );

    o(between(16, 64, 320, 1280, 'vh')).equals('5vh')(
      'returns bare slope when intercept is zero'
    );

    // ----

    o(between(px(16), 24, 320, 1368, '%')).equals(
      'calc(0.7633587786259541% + 13.557251908396948px)'
    )('accepts `from` as px');
    o(between(16, px(24), 320, 1368, '%')).equals(
      'calc(0.7633587786259541% + 13.557251908396948px)'
    )('accepts `to` as px');
    o(between(16, 24, px(320), 1368, '%')).equals(
      'calc(0.7633587786259541% + 13.557251908396948px)'
    )('accepts `min` as px');
    o(between(16, 24, 320, px(1368), '%')).equals(
      'calc(0.7633587786259541% + 13.557251908396948px)'
    )('accepts `max` as px');
    o(between(pct(5), 64, 320, 1280, 'vh')).equals('5vh')('accepts `from` as %');
    o(between(16, pct(5), 320, 1280, 'vh')).equals('5vh')('accepts `to` as %');
  });
});
