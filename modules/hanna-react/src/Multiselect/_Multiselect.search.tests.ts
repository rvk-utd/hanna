import o from 'ospec';

import { TogglerGroupFieldOption } from '../_abstract/_TogglerGroupField.js';

import {
  _weights,
  defaultSearchScoring,
  filterItems,
  SearchScoringfn,
} from './_Multiselect.search.js';

const { WHOLE_WORD, STARTS_WITH, CONTAINS, VALUE_WEIGHT, wordWeight: ww } = _weights;

type Item = TogglerGroupFieldOption<string>;

const score = (iten: Item, query: string) =>
  defaultSearchScoring(iten, query.trim().toLowerCase().split(/\s+/), query);

const sum = (a = 0, b: number) => a + b;

// ---------------------------------------------------------------------------

o.spec('defaultSearchScoring', () => {
  o('works', () => {
    const itemFoo: Item = {
      value: 'Bar',
    };

    const itemFooBar: Item = {
      label: 'Foo',
      ...itemFoo,
    };

    o(score(itemFoo, 'bar')).equals(WHOLE_WORD)('value only is treated as label');
    o(score(itemFooBar, 'foo')).equals(WHOLE_WORD)('label match');
    o(score(itemFooBar, 'fo')).equals(STARTS_WITH)('label starts with');
    o(score(itemFooBar, 'bar')).equals(VALUE_WEIGHT * WHOLE_WORD)('value match');
    o(score(itemFooBar, 'ba')).equals(VALUE_WEIGHT * STARTS_WITH)('value starts with');
    o(score({ ...itemFooBar, disabled: true }, 'foo')).equals(WHOLE_WORD)(
      'unaffectd by "disabled"'
    );
    o(score({ label: 'foobar', value: 'foo' }, 'foo')).equals(STARTS_WITH)(
      'ignores value if label matches'
    );
  });

  o('multiple matches', () => {
    o(score({ value: 'Foo foobar barfoo' }, 'foo')).equals(
      [WHOLE_WORD, ww(1) * STARTS_WITH, ww(2) * CONTAINS].reduce(sum)
    )('single query word');
    o(score({ label: 'Other', value: 'Foo foobar barfoo' }, 'foo')).equals(
      VALUE_WEIGHT * [WHOLE_WORD, ww(1) * STARTS_WITH, ww(2) * CONTAINS].reduce(sum)
    )('single query word, value match');

    o(score({ label: 'foo', value: 'bar' }, 'foo bar')).equals(WHOLE_WORD)(
      'ignores value if label matches'
    );

    o(score({ value: 'Foo foobar barfoo' }, 'foo foo')).equals(
      2 * score({ value: 'Foo foobar barfoo' }, 'foo')
    )('multiple query words match individually');

    o(score({ value: 'Foo foobar barfoo' }, 'fo foo')).equals(
      [
        STARTS_WITH,
        ww(1) * STARTS_WITH,
        ww(2) * CONTAINS,
        //
        WHOLE_WORD,
        ww(1) * STARTS_WITH,
        ww(2) * CONTAINS,
      ].reduce(sum)
    )('query word order does not matter 1');

    o(score({ value: 'Foo bar' }, 'foo bar')).equals(
      score({ value: 'Foo bar' }, 'bar foo')
    )('query word order does not matter 2');
  });
});

// ---------------------------------------------------------------------------

o.spec('filterItems', () => {
  const item1: Item = { label: 'Fo', value: 'Fo' };
  const item2: Item = { label: 'Ba', value: 'fo fo' };
  const item3: Item = { label: 'Foo bar', value: 'Foo bar' };
  const item3_dupl: Item = { label: 'Foo bar', value: 'Foo bar', disabled: true };
  const item4: Item = { label: 'Bar foo', value: 'Bar' };
  const item5: Item = { label: 'Baz', value: 'Baz' };
  const item6: Item = { label: 'Smu', value: 'Smu' };

  const options = [
    // semi-shuffled order
    item4,
    item6,
    item3,
    item3_dupl,
    item2,
    item5,
    item1,
  ];

  o('works', () => {
    o(filterItems(options, 'foo')).deepEquals([item3, item3_dupl, item4])('stable sort');
    o(filterItems(options, 'fo')).deepEquals([item1, item2, item3, item3_dupl, item4]);
    o(filterItems(options, 'BA')).deepEquals([item2, item4, item5, item3, item3_dupl]);
    o(filterItems(options, '')).deepEquals(options)(
      'empty query string performs no filtering'
    );
    o(filterItems(options, '')).notEquals(options)('always returns a new array');
  });

  o('custom scoring function', () => {
    let called = 0;
    const wonkyScorer: SearchScoringfn = (item) => {
      called++;
      return item.value.toLowerCase() === 'smu' ? 1 : -1 * (called % 2);
    };
    o(filterItems(options, 'foo', wonkyScorer)).deepEquals([item6])('stable sort');
    o(called > 3).equals(true)('custom scorer was called');

    called = 0; // reset counter
    o(filterItems(options, '', wonkyScorer)).deepEquals(options)(
      'empty query string performs no filtering'
    );
    o(called).equals(0)('custom scorer was never called');
  });
});
