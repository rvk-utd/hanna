import React from 'react';
import range from '@hugsmidjan/qj/range';
import type { MetaFunction } from '@remix-run/node';
import SearchResults, {
  SearchResultsItemProps,
} from '@reykjavik/hanna-react/SearchResults';
import SiteSearchInput from '@reykjavik/hanna-react/SiteSearchInput';

import { Minimal } from '../../layout/Minimal';
import { illustr, lorem } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
export const handle = { cssTokens: ['SiteSearchInput'] };
const items = range(1, 3).map(
  (item): SearchResultsItemProps => ({
    title: 'Niðurstaða ' + item,
    meta: item % 3 === 1 ? ['Fréttir', '15. janúar 2020'] : undefined,
    summary: item % 3 === 1 ? lorem.medium : item % 3 === 2 ? lorem.short : lorem.tiny,
    href: '/',
  })
);

items.unshift({
  highlight: true,
  href: '',
  title: 'Some title here',
  summary: lorem.short,
  image: illustr.tall.src,
  meta: '10. október 2022',
});
export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <SiteSearchInput label="leit" />
      <SearchResults
        status={'results'}
        pageSize={0}
        hits={items.length}
        query="leitarorð"
        items={items}
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {};
