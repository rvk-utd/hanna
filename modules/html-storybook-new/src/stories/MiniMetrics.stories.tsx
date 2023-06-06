import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { MiniMetricsStory } from '../Shared/MiniMetrics.js';

const meta: Meta = {
  title: 'MiniMetrics',
};
export default meta;

type Story = StoryObj;

export const _MiniMetrics: Story = {
  render: () => <MiniMetricsStory />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};
