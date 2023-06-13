import React from 'react';
import { ArticleMeta, ArticleMetaItem } from '@reykjavik/hanna-react/ArticleMeta';
import { Meta, StoryObj } from '@storybook/react';

import { StoryParameters } from '../utils/storytypes.js';

type Story = StoryObj;

const meta: Meta = {
  title: 'ArticleMeta',
  parameters: {
    controls: { hideNoControlsWarning: true },
    viewport: {
      defaultViewport: 'responsive',
    },
  } as StoryParameters,
};

export default meta;

const ITEMS: Array<ArticleMetaItem> = [
  {
    label: 'Mánudagur, 30. maí 2021',
  },
  {
    label: 'Dagur B. Eggertsson',
    href: '/borgarstjori',
  },
];

export const _ArticleMeta: Story = {
  render: () => <ArticleMeta items={ITEMS} />,
};
