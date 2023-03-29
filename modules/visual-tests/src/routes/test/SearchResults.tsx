import React from 'react';
import range from '@hugsmidjan/qj/range';
import type { MetaFunction } from '@remix-run/node';
import {
  SearchResults,
  SearchResultsItemProps,
} from '@reykjavik/hanna-react/SearchResults';
import { SiteSearchInput } from '@reykjavik/hanna-react/SiteSearchInput';

import { DummyBlock } from '../../layout/DummyBlock.js';
import { Minimal } from '../../layout/Minimal.js';
import { lorem, photo } from '../../test-helpers/dummyData.js';
import type { TestingInfo } from '../../test-helpers/testingInfo.js';
import { autoTitle } from '../../utils/meta.js';
import { cssTokens } from '../../utils/route.server';

export const meta: MetaFunction = autoTitle;

// // Use `handle` if you're using multiple Hanna compnents
export const handle = cssTokens('SiteSearchInput');

const items = range(1, 4).map(
  (item): SearchResultsItemProps => ({
    title: item % 4 === 1 ? lorem.tiny : 'Niðurstaða ' + item,
    meta: item % 3 === 1 ? ['Fréttir', '15. janúar 2020'] : undefined,
    summary: item % 3 === 1 ? lorem.medium : item % 3 === 2 ? lorem.tiny : '',
    href: '/',
  })
);

const fancyItems = [
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
    summary: lorem.short,
    image: photo.portrait.src,
    meta: '10. október 2022',
  },
  ...items,
];

export default function () {
  return (
    <Minimal>
      <div className="SiteSearchPage">
        <SiteSearchInput label="leit" name="q" />
        <SearchResults
          status="results"
          pageSize={10}
          totalHits={1234}
          hits={fancyItems.length}
          query="leitarorð"
          items={fancyItems}
        />
      </div>
      <DummyBlock thin />
      <SearchResults
        status="results"
        pageSize={2}
        totalHits={45}
        pages={23}
        hits={45}
        query="leitarorð"
        items={items.slice(0, 2)}
        filters={[
          { label: 'Lorem', count: 42 },
          { label: 'Ipsum', count: 3 },
        ]}
      />
    </Minimal>
  );
}

export const testing: TestingInfo = {};
