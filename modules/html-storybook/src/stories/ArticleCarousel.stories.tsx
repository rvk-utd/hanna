import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { ArticleCarouselStory } from './Shared/ArticleCarousel.js';

const meta: Meta = {
  title: 'ArticleCarousel',
  parameters: {
    controls: { hideNoControlsWarning: true },
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

export const _ArticleCarousel: StoryObj = {
  render: () => <ArticleCarouselStory />,
};
