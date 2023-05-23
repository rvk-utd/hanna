import React from 'react';
import range from '@hugsmidjan/qj/range';
import {
  SearchResults,
  SearchResultsItemProps,
} from '@reykjavik/hanna-react/SearchResults';
import { getIllustrationUrl } from '@reykjavik/hanna-utils/assets';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SearchResults> = {
  title: 'SearchResults',
  component: SearchResults,
};
export default meta;

type Story = StoryObj<typeof SearchResults>;

// ===========================================================================

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

export const _SearchResults: Story = {
  render: () => (
    <SearchResults
      status="results"
      pageSize={10}
      hits={items.length}
      query="leitarorð"
      items={items}
    />
  ),
};
