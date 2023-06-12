import React from 'react';
import { ArticleCards } from '@reykjavik/hanna-react/ArticleCards';
import { getIllustrationUrl } from '@reykjavik/hanna-utils/assets';
import { Meta, StoryObj } from '@storybook/react';

import { imageCards } from '../utils/_dummyData.js';

type ControlProps = {
  customFallbackImage: boolean;
};

type Story = StoryObj<ControlProps>;

const meta: Meta<ControlProps> = {
  title: 'ArticleCards',
};
export default meta;

const ArticleCardsStory: React.FC<ControlProps> = ({ customFallbackImage }) => {
  const imgPlaceholderUrl = customFallbackImage
    ? getIllustrationUrl('framkvaemdir2')
    : undefined;

  return <ArticleCards cards={imageCards} imgPlaceholder={imgPlaceholderUrl} />;
};

export const _ArticleCards: Story = {
  render: (args: ControlProps) => <ArticleCardsStory {...args} />,
  argTypes: {
    customFallbackImage: {
      control: 'boolean',
      name: 'Custom fallback image',
    },
  },
  args: {
    customFallbackImage: false,
  },
};
