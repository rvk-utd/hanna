import { pct, px } from 'es-in-css';
import o from 'ospec';

import { clamp_phone, scale } from './between.js';

o.spec('between helper', () => {
  o('works', () => {
    o(scale(16, 24, 320, 1368, '%')).equals(
      'calc(0.7633587786259541% + 13.557251908396948px)'
    )('supports %');

    o(scale(16, 24, 320, 1368, 'vw')).equals(
      'calc(0.7633587786259541vw + 13.557251908396948px)'
    )('supports vw');

    o(scale(16, 16, 320, 1368, '%')).equals('16px')(
      'returns bare intercept when slopeFactor is zero'
    );

    o(scale(16, 64, 320, 1280, 'vh')).equals('5vh')(
      'returns bare slope when intercept is zero'
    );

    // ----

    o(scale(px(16), 24, 320, 1368, '%')).equals(
      'calc(0.7633587786259541% + 13.557251908396948px)'
    )('accepts `from` as px');
    o(scale(16, px(24), 320, 1368, '%')).equals(
      'calc(0.7633587786259541% + 13.557251908396948px)'
    )('accepts `to` as px');
    o(scale(16, 24, px(320), 1368, '%')).equals(
      'calc(0.7633587786259541% + 13.557251908396948px)'
    )('accepts `min` as px');
    o(scale(16, 24, 320, px(1368), '%')).equals(
      'calc(0.7633587786259541% + 13.557251908396948px)'
    )('accepts `max` as px');
    o(scale(pct(5), 64, 320, 1280, 'vh')).equals('5vh')('accepts `from` as %');
    o(scale(16, pct(5), 320, 1280, 'vh')).equals('5vh')('accepts `to` as %');
  });
});

o.spec('clamp_phone helper', () => {
  o('works', () => {
    o(clamp_phone(12, 16)).equals('clamp(12px, calc(2.5vw + 4px), 16px)')(
      'creates clamp() expression'
    );
    o(clamp_phone(16, 16)).equals('16px')(
      'returns bare intercept when slopeFactor is zero'
    );
    o(clamp_phone(16, 24)).equals('clamp(16px, 5vw, 24px)')(
      'returns bare slope when intercept is zero'
    );
  });
});
