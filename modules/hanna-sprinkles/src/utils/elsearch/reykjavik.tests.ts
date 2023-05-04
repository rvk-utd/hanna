import o from 'ospec';

import { createElasticQuery, queryToString } from './reykjavik.is.js';

const baseQuery = createElasticQuery({
  value: 'SomeValue',
  preference: 'MyPreference',
  size: 99,
});

const baseQueriesString =
  '{ "preference": "MyPreference" }\n{"query":{"bool":{"should":[{"multi_match":{"query":"SomeValue","fields":["label^10","field_preview_text.value^2","content^1"],"type":"bool_prefix","operator":"and"}},{"multi_match":{"query":"SomeValue","fields":["label^10","field_preview_text.value^2","content^1"],"type":"phrase","operator":"and"}}],"minimum_should_match":"1"}},"size":99,"sort":[{"_score":{"order":"desc"}},{"bundle_weight":{"order":"desc"}}]}\n';

o.spec('queryToString', () => {
  const qs = queryToString(baseQuery);
  o('Query matches predefined return value', () => {
    o(qs).equals(baseQueriesString);
  });

  o('Query includes preference', () => {
    o(qs.includes('{ "preference": "MyPreference" }')).equals(true);
  });

  o('Query includes search value', () => {
    o(qs.includes('"query":"SomeValue"')).equals(true);
  });

  o('Query includes size value', () => {
    o(qs.includes('"size":99')).equals(true);
  });
});
