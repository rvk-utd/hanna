import React from 'react';
import { ArticleCarousel } from '@reykjavik/hanna-react/ArticleCarousel';
import { Meta, StoryObj } from '@storybook/react';

import { ArticleCarouselStory } from '../Shared/ArticleCarousel.js';

const meta: Meta<typeof ArticleCarousel> = {
  title: 'ArticleCarousel',
  component: ArticleCarousel,
};
export default meta;

type Story = StoryObj<typeof ArticleCarousel>;

export const _ArticleCarousel: Story = {
  render: () => <ArticleCarouselStory />,
};
