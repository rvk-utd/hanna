import React from 'react';
import ArticleCarousel from '@reykjavik/hanna-react/ArticleCarousel.js';
import { Meta, StoryObj } from '@storybook/react';

import { articleCarouselData } from './shared/articleCarousel.data.js';

const meta: Meta = {
  title: 'ArticleCarousel',
  parameters: {
    controls: { hideNoControlsWarning: true },
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

export const _ArticleCarousel: StoryObj = {
  render: () => <ArticleCarousel {...articleCarouselData} />,
};
