import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { ArticleCarouselStory } from '../Shared/ArticleCarousel.js';
import { StoryParameters } from '../utils/storytypes.js';

type Story = StoryObj;

const meta: Meta = {
  title: 'ArticleCarousel',
};
export default meta;

export const _ArticleCarousel: Story = {
  render: () => <ArticleCarouselStory />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  } as StoryParameters,
};
