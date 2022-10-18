import React from 'react';
import range from '@hugsmidjan/qj/range';
import type { MetaFunction } from '@remix-run/node';
import SearchResults, {
  SearchResultsItemProps,
} from '@reykjavik/hanna-react/SearchResults';
import SiteSearchInput from '@reykjavik/hanna-react/SiteSearchInput';

import { Minimal } from '../../layout/Minimal';
import { lorem, photo } from '../../test-helpers/dummyData';
import type { TestingInfo } from '../../test-helpers/testingInfo';
import { autoTitle } from '../../utils/meta';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
export const handle = { cssTokens: ['SiteSearchInput'] };

const items = range(1, 4).map(
  (item): SearchResultsItemProps => ({
    title: item % 4 === 1 ? lorem.tiny : 'Niðurstaða ' + item,
    meta: item % 3 === 1 ? ['Fréttir', '15. janúar 2020'] : undefined,
    summary: item % 3 === 1 ? lorem.medium : item % 3 === 2 ? lorem.tiny : '',
    href: '/',
  })
);

items.unshift(
  {
    highlight: true,
    href: '',
    title: 'Some title here',
    summary: lorem.tiny,
  },
  {
    highlight: true,
    href: '',
    title: 'Somewhat longer title here',
    summary: lorem.short,
    image: photo.square.src,
    meta: '10. október 2022',
  },
  {
    highlight: true,
    href: '',
    title: 'Somewhat longer title',
    // summary: lorem.short,
    image: photo.portrait.src,
    meta: '10. október 2022',
  }
);

export default function () {
  return (
    // Minimal is a no-frills, no-chrome replacement for the `Layout` component,
    <Minimal>
      <div className="SiteSearchPage">
        <SiteSearchInput label="leit" name="q" />
        <SearchResults
          status={'results'}
          pageSize={0}
          hits={items.length}
          query="leitarorð"
          items={items}
        />
      </div>
    </Minimal>
  );
}

export const testing: TestingInfo = {};
