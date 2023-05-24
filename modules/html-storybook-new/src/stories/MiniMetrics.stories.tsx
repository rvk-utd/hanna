import React from 'react';
import { MiniMetrics } from '@reykjavik/hanna-react/MiniMetrics';
import { Meta, StoryObj } from '@storybook/react';

import { MiniMetricsStory } from '../Shared/MiniMetrics.js';

const meta: Meta<typeof MiniMetrics> = {
  title: 'MiniMetrics',
  component: MiniMetrics,
};
export default meta;

type Story = StoryObj<typeof MiniMetrics>;

export const _MiniMetrics: Story = {
  render: () => <MiniMetricsStory />,
};
