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
      <div style={{ width: 280, padding: '1rem', border: '1px dashed #A867FC' }}>
        <ProgressBar value={0} />
        <ProgressBar value={50} />
        <ProgressBar value={100} />
        <ProgressBar value={0} />
        <ProgressBar value={0} />
      </div>
      <div style={{ backgroundColor: '#0367E1', width: 280, padding: '1rem' }}>
        <ProgressBar barColor="white" value={0} />
        <ProgressBar barColor="white" value={50} />
        <ProgressBar barColor="white" value={100} />
        <ProgressBar barColor="white" value={0} />
        <ProgressBar barColor="white" value={0} />
      </div>
    </div>
  ),
};
