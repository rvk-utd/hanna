import React from 'react';
import { ArticleMeta, ArticleMetaItem } from '@reykjavik/hanna-react/ArticleMeta';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ArticleMeta> = {
  title: 'components/ArticleMeta',
  component: ArticleMeta,
};
export default meta;

type Story = StoryObj<typeof ArticleMeta>;

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
