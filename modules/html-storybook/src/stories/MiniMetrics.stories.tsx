import React from 'react';
import { MiniMetrics } from '@reykjavik/hanna-react/MiniMetrics';
import { Meta, StoryObj } from '@storybook/react';

import { miniMetricsData } from './shared/miniMetrics.data.js';

const meta: Meta = {
  title: 'MiniMetrics',
};
export default meta;

export const _MiniMetrics: StoryObj = {
  render: () => <MiniMetrics {...miniMetricsData} />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};
