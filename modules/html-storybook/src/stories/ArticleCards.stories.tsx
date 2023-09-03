import React from 'react';
import { ArticleCards } from '@reykjavik/hanna-react/ArticleCards';
import { getIllustrationUrl } from '@reykjavik/hanna-utils/assets';
import { Meta, StoryObj } from '@storybook/react';

import { imageCards } from '../utils/_dummyData.js';

type ControlProps = {
  customFallbackImage: boolean;
  large: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'ArticleCards',
};
export default meta;

const ArticleCardsStory = (props: ControlProps) => {
  const imgPlaceholderUrl = props.customFallbackImage
    ? getIllustrationUrl('framkvaemdir2')
    : undefined;
  const size = props.large ? 'large' : undefined;

  return (
    <ArticleCards cards={imageCards} size={size} imgPlaceholder={imgPlaceholderUrl} />
  );
};

export const _ArticleCards: StoryObj<ControlProps> = {
  render: (args) => <ArticleCardsStory {...args} />,
  argTypes: {
    customFallbackImage: { name: 'Custom fallback image' },
    large: { name: 'Large cards' },
  },
  args: {
    customFallbackImage: false,
    large: false,
  },
};
