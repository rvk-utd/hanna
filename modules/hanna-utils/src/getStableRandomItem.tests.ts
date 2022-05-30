import o from 'ospec';

import { getStableRandomItem } from './getStableRandomItem';

const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'];

o.spec('getStableRandomItem', () => {
  o('gets an item', () => {
    const item1 = getStableRandomItem(arr, 'Hello World');
    const item2 = getStableRandomItem(arr, 'Halló Heimur');
    const item3 = getStableRandomItem(arr, '');
    o(typeof item1).equals('string');
    o(typeof item2).equals('string');
    o(typeof item3).equals('string')('Handles empty `seed` string');
    o(item1).notEquals(item2)('different seeds make different results (1 and 2)');
    o(item2).notEquals(item3)('different seeds make different results (2 and 3)');
  });

  o('Returns undefined if array is empty', () => {
    const item = getStableRandomItem([], 'Hello world');
    o(typeof item).equals('undefined');
  });

  o('Is stable for the same seed', () => {
    const item1 = getStableRandomItem(arr, 'Hello World');
    const item2 = getStableRandomItem(arr, 'Hello World');
    const item3 = getStableRandomItem(arr, 'Hello World');
    o(item1).equals(item2)('1 and 2 are same');
    o(item2).equals(item3)('2 and 3 are same');
  });
});
