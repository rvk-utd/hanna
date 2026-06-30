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
        <ProgressBar color="blue" value={0} />
        <ProgressBar color="blue" value={25} />
        <ProgressBar color="blue" value={50} />
        <ProgressBar color="blue" value={75} />
        <ProgressBar color="blue" value={100} />
      </div>
      <div style={{ backgroundColor: '#0367E1', width: 280, padding: '1rem' }}>
        <ProgressBar color="white" value={0} />
        <ProgressBar color="white" value={25} />
        <ProgressBar color="white" value={50} />
        <ProgressBar color="white" value={75} />
        <ProgressBar color="white" value={100} />
      </div>
    </div>
  ),
};
