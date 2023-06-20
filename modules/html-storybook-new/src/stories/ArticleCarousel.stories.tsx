import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { StoryParameters } from '../utils/storytypes.js';

import { ArticleCarouselStory } from './Shared/ArticleCarousel.js';

type Story = StoryObj;

const meta: Meta = {
  title: 'ArticleCarousel',
  parameters: {
    controls: { hideNoControlsWarning: true },
    viewport: {
      defaultViewport: 'responsive',
    },
  } as StoryParameters,
};
export default meta;

export const _ArticleCarousel: Story = {
  render: () => <ArticleCarouselStory />,
};
