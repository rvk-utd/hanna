import React from 'react';
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
    <div>
      <p>huga buga</p>
      <progress id="file" max="100" value="50">
        70%
      </progress>
    </div>
  ),
};
