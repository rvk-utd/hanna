import React from 'react';
import { ArticleCards, ArticleCardsProps } from '@reykjavik/hanna-react/ArticleCards';
import { getIllustrationUrl } from '@reykjavik/hanna-utils/assets';
import { Meta, StoryObj } from '@storybook/react';

import { imageCards } from '../utils/_dummyData.js';
import { disableControlProps } from '../utils/disableControlTypes.js';

type Story = StoryObj<ArticleCardsProps>;

const meta: Meta<ArticleCardsProps> = {
  title: 'ArticleCards',
  component: ArticleCards,
};
export default meta;

const ArticleCardsStory: React.FC<ArticleCardsProps> = ({ imgPlaceholder }) => {
  const imgPlaceholderUrl = imgPlaceholder
    ? getIllustrationUrl('framkvaemdir2')
    : undefined;

  return <ArticleCards cards={imageCards} imgPlaceholder={imgPlaceholderUrl} />;
};

export const _ArticleCards: Story = {
  render: (args: ArticleCardsProps) => <ArticleCardsStory {...args} />,
  argTypes: {
    imgPlaceholder: {
      control: 'boolean',
      name: 'Custom fallback image',
    },
    ...disableControlProps(['cards']),
  },
  args: {
    imgPlaceholder: false,
  },
};
