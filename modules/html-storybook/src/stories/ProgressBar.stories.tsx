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
        <ProgressBar barColor="blue" value={0} />
        <ProgressBar barColor="blue" value={25} />
        <ProgressBar barColor="blue" value={50} />
        <ProgressBar barColor="blue" value={75} />
        <ProgressBar barColor="blue" value={100} />
      </div>
      <div style={{ backgroundColor: '#0367E1', width: 280, padding: '1rem' }}>
        <ProgressBar barColor="white" value={0} />
        <ProgressBar barColor="white" value={25} />
        <ProgressBar barColor="white" value={50} />
        <ProgressBar barColor="white" value={75} />
        <ProgressBar barColor="white" value={100} />
      </div>
    </div>
  ),
};
