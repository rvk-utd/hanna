import React from 'react';
import {
  ArticleCarousel,
  ArticleCarouselProps,
} from '@reykjavik/hanna-react/ArticleCarousel';
import { Meta, StoryObj } from '@storybook/react';

import { ArticleCarouselStory } from '../Shared/ArticleCarousel.js';
import { disableControlProps } from '../utils/disableControlTypes.js';

type Story = StoryObj<ArticleCarouselProps>;

const meta: Meta<ArticleCarouselProps> = {
  title: 'ArticleCarousel',
  component: ArticleCarousel,
};
export default meta;

export const _ArticleCarousel: Story = {
  render: () => <ArticleCarouselStory />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  argTypes: {
    ...disableControlProps(['items', 'title', 'moreLabel', 'ssr', 'startSeen']),
  },
};
