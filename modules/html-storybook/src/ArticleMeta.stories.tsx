import React from 'react';
import { ArticleMeta, ArticleMetaItem } from '@reykjavik/hanna-react/ArticleMeta';

import { StoryComponent, StoryParameters } from './storytypes.js';

export default {
  title: 'ArticleMeta',
  component: ArticleMeta,
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  } as StoryParameters,
};

const ITEMS: Array<ArticleMetaItem> = [
  {
    label: 'Mánudagur, 30. maí 2021',
  },
  {
    label: 'Dagur B. Eggertsson',
    href: '/borgarstjori',
  },
];

export const _ArticleMeta: StoryComponent = () => <ArticleMeta items={ITEMS} />;
