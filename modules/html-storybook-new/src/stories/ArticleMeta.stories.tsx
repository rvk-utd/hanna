import React from 'react';
import {
  ArticleMeta,
  ArticleMetaItem,
  ArticleMetaProps,
} from '@reykjavik/hanna-react/ArticleMeta';
import { Meta, StoryObj } from '@storybook/react';

import { disableControlProps } from '../utils/disableControlTypes.js';

type Story = StoryObj<ArticleMetaProps>;

const meta: Meta<ArticleMetaProps> = {
  title: 'ArticleMeta',
  component: ArticleMeta,
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
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  argTypes: {
    ...disableControlProps(['items', 'small']),
  },
};