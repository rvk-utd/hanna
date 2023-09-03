import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { MiniMetricsStory } from './Shared/MiniMetrics.js';

const meta: Meta = {
  title: 'MiniMetrics',
};
export default meta;

export const _MiniMetrics: StoryObj = {
  render: () => <MiniMetricsStory />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};
