import o from 'ospec';

import { classes, modifiedClass } from './classUtils.js';

o.spec('classes', () => {
  o('Accepts string and/or string arrays', () => {
    o(classes('A')).equals('A');
    o(classes('B', 'C', 'D')).equals('B C D');
    o(classes('E', ['F'], ['G'])).equals('E F G');
    o(classes(['H', 'I', 'J'])).equals('H I J');
    o(classes(['K', [['L'], 'M']])).equals('K L M');
  });

  o('Ignores empty/nully values', () => {
    (['', undefined, false, null] as const).forEach((modifier) => {
      o(classes(modifier)).equals('');
    });
    o(classes(null, 'A', ['', ['B', undefined], false])).equals('A B');
    o(classes('A', ['', [null, undefined]])).equals('A');
  });

  o('Does NOT trim or otherwise clean up strings', () => {
    const borked = [' borked ', '  value '];
    o(classes(borked)).equals(borked.join(' '));
  });

  o('Simply casts numbers and `true` values to string', () => {
    // @ts-expect-error  (testing invalid input)
    o(classes(10, 9.9, true)).equals('10 9.9 true');
  });

  o('Does NOT dedupe class-names', () => {
    o(classes('A', 'A', 'A')).equals('A A A');
  });
});

const bem = 'BEM';

o.spec('modifiedClass', () => {
  o('Accepts string modifiers', () => {
    o(modifiedClass(bem, 'hello')).equals('BEM BEM--hello');
    o(modifiedClass(bem, ['hello', 'world'])).equals('BEM BEM--hello BEM--world');
  });

  o('Ignores empty/nully values', () => {
    o(modifiedClass(bem, ['', undefined, false, null])).equals('BEM');
    o(modifiedClass(bem, [null, 'hello', '', 'world', undefined, false])).equals(
      'BEM BEM--hello BEM--world'
    );
  });

  o('Accepts and appends extra classNames', () => {
    o(modifiedClass(bem, 'hello', 'custom')).equals('BEM BEM--hello custom');
    o(modifiedClass(bem, null, 'custom')).equals('BEM custom');
  });

  o('Accepts nested arrays', () => {
    o(
      modifiedClass(bem, [
        null,
        ['hello'],
        [
          [undefined, 'cruel', false],
          ['', undefined, [null, 0, ['world']]],
        ],
      ])
    ).equals('BEM BEM--hello BEM--cruel BEM--world');
  });

  o('Does NOT trim or otherwise clean up strings', () => {
    o(modifiedClass(bem, ' borked ')).equals('BEM BEM-- borked ');
    o(modifiedClass(bem, [' borked '])).equals('BEM BEM-- borked ');
    o(modifiedClass(bem, null, ' borked ')).equals('BEM  borked ');
    o(modifiedClass(`${bem} `, 'borked')).equals('BEM  BEM --borked');
  });
});
