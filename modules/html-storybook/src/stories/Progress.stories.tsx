import React from 'react';
import { Progress } from '@reykjavik/hanna-react/Progress';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Progress',
  parameters: {
    controls: { hideNoControlsWarning: true },
    viewport: { defaultViewport: 'responsive' },
  },
};

export default meta;

export const _Progress: StoryObj = {
  render: () => (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          width: 280,
          padding: '1rem',
          border: '1px dashed #A867FC',
          gridGap: 15,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Progress percent={0} variant="spinner" />
        <Progress percent={25} variant="spinner" />
        <Progress percent={50} variant="spinner" />
        <Progress percent={75} variant="spinner" color="orange" />
        <Progress percent={100} variant="spinner" />
      </div>
      <div
        style={{
          width: 280,
          padding: '1rem',
          border: '1px dashed #A867FC',
          gridGap: 15,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Progress percent={0} />
        <Progress percent={25} />
        <Progress percent={50} />
        <Progress percent={75} color="red" />
        <Progress percent={100} />
      </div>
    </div>
  ),
};
