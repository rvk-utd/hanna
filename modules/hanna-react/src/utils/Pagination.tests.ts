import o from 'ospec';

import { generatePageList } from './Pagination.privates';

// @ts-expect-error  (testing bad input)
const stringInput: number = 'foo';
// @ts-expect-error  (testing bad input)
const nullInput: number = null;

o.spec('generatePageList', () => {
  o('works', () => {
    o(generatePageList(1, 3).join()).equals('1,2,3')('1 of 3');
    o(generatePageList(3, 3).join()).equals('1,2,3')('3 of 3');
    o(generatePageList(1, 7).join()).equals('1,2,3,4,5,6,7')('1 of 7');
    o(generatePageList(5, 7).join()).equals('1,2,3,4,5,6,7')('5 of 7');
    o(generatePageList(7, 7).join()).equals('1,2,3,4,5,6,7')('7 of 7');
    o(generatePageList(1, 8).join()).equals('1,2,3,4,5,…,8')('1 of 8');
    o(generatePageList(3, 8).join()).equals('1,2,3,4,5,…,8')('3 of 8');
    o(generatePageList(4, 8).join()).equals('1,2,3,4,5,6,…,8')('4 of 8');
    o(generatePageList(5, 8).join()).equals('1,…,3,4,5,6,7,8')('5 of 8');
    o(generatePageList(6, 8).join()).equals('1,…,4,5,6,7,8')('6 of 8');
    o(generatePageList(8, 8).join()).equals('1,…,4,5,6,7,8')('8 of 8');
    o(generatePageList(87, 88).join()).equals('1,…,84,85,86,87,88')('87 of 88');
    o(generatePageList(2, 88).join()).equals('1,2,3,4,5,…,88')('2 of 88');
    o(generatePageList(51, 88).join()).equals('1,…,49,50,51,52,53,…,88')('51 of 88');
  });

  o('gracefully handles out of bounds `current`', () => {
    o(generatePageList(100, 10).join()).equals('1,…,6,7,8,9,10')('100 of 10');
    o(generatePageList(-100, 10).join()).equals('1,2,3,4,5,…,10')('-100 of 10');
  });

  if (process.env.NODE_ENV !== 'production') {
    o('throws on NaN or float inputs (in dev mode)', () => {
      o(() => generatePageList(1, 3.3)).throws('pageCount parameter must be an integer')(
        '1 of 3.3'
      );
      o(() => generatePageList(1.1, 10)).throws('current parameter must be an integer')(
        '1.1 of 10'
      );
    });
  }

  o('fails on bad input in production', () => {
    generatePageList.prodMode = true;
    o(() => generatePageList(1, stringInput)).throws(Error)('1 of "foo"');
    o(() => generatePageList(stringInput, 10)).throws(Error)('"foo" of 1ö');
    o(() => generatePageList(1, nullInput)).throws(Error)('1 of null');
    o(generatePageList(nullInput, 10).join()).equals('1,2,3,4,5,…,10')(
      'null of 10 equals 1 of 10'
    );
    o(generatePageList(1, 3.7).join()).equals('1,2,3')('1 of 3.7');
    o(generatePageList(7.7, 20).join()).equals('1,…,5.7,6.7,7.7,8.7,9.7,…,20')(
      '7.7 of 20'
    );
    generatePageList.prodMode = false;
  });
});
