import React from 'react';
import ProgressBar from '@reykjavik/hanna-react/Progressbar';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'ProgressBar',
  parameters: {
    controls: { hideNoControlsWarning: true },
    viewport: { defaultViewport: 'responsive' },
  },
};

export default meta;

export const _ProgressBar: StoryObj = {
  render: () => (
    <div style={{ display: 'flex' }}>
      <div style={{ width: 280, padding: '1rem' }}>
        <ProgressBar barColor="blue" />
        <ProgressBar barColor="blue" />
        <ProgressBar barColor="blue" />
        <ProgressBar barColor="blue" />
        <ProgressBar barColor="blue" />
      </div>
      <div style={{ backgroundColor: '#0367E1', width: 280, padding: '1rem' }}>
        <ProgressBar barColor="white" />
        <ProgressBar barColor="white" />
        <ProgressBar barColor="white" />
        <ProgressBar barColor="white" />
      </div>
    </div>
  ),
};
