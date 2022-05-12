import o from 'ospec';

import { between } from './between';

o.spec('between helper', () => {
  o('works', () => {
    o(between(16, 24, 320, 1368, '%')).equals(
      'calc(0.7633587786259541% + 13.557251908396948px)'
    )('supports %');
    o(between(16, 24, 320, 1368, 'vw')).equals(
      'calc(0.7633587786259541vw + 13.557251908396948px)'
    )('supports vw');
    o(between(16, 16, 320, 1368, '%')).equals('16px')(
      'returns bare intercept when slopeFactor is 0'
    );
    o(between(16, 64, 320, 1280, 'vh')).equals('5vh')(
      'returns bare slope when intercept is 0'
    );
  });
});
