import React from 'react';
import range from '@hugsmidjan/qj/range';
import {
  SearchResults,
  SearchResultsItemProps,
} from '@reykjavik/hanna-react/SearchResults';
import { SiteSearchInput } from '@reykjavik/hanna-react/SiteSearchInput';
import { getIllustrationUrl } from '@reykjavik/hanna-utils/assets';

// ===========================================================================

export default {
  title: 'SearchResults',
  component: SearchResults,
  parameters: { knobs: { disabled: false } },
};

const items = range(1, 3).map(
  (item): SearchResultsItemProps => ({
    title: 'Niðurstaða ' + item,
    meta: item % 3 === 1 ? ['Fréttir', '15. janúar 2020'] : undefined,
    summary:
      'Á leikskólum er haft að leiðarljósi að börnin njóti bernsku sinnar og læri og þroskist í leik og samveru.',
    href: '/',
  })
);

items.unshift({
  highlight: true,
  href: '',
  title: 'Dagforeldrar í Reykjavík',
  summary:
    'Á leikskólum er haft að leiðarljósi að börnin njóti bernsku sinnar og læri og þroskist í leik og samveru.',
  image: getIllustrationUrl('borgarstjori1'),
  meta: '23. janúar 2021',
});

// ---------------------------------------------------------------------------

export const _SearchResults = () => {
  return (
    <SearchResults
      status="results"
      pageSize={10}
      hits={items.length}
      query="leitarorð"
      items={items}
    />
  );
};

export const _SiteSearchSearchResults = () => {
  return (
    <div className="SiteSearchPage">
      <SiteSearchInput label="leit" />
      <SearchResults
        status="results"
        pageSize={10}
        hits={items.length}
        query="leitarorð"
        items={items}
      />
    </div>
  );
};

_SiteSearchSearchResults.story = {
  parameters: {
    css: {
      tokens: 'SearchResults,SiteSearchInput',
    },
  },
};
