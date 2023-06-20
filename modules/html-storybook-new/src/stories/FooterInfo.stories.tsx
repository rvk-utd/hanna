import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { FooterInfoStory } from './Shared/FooterInfo.js';

type Story = StoryObj;

const meta: Meta = {
  title: 'Layout/FooterInfo',
};
export default meta;

export const _FooterInfo: Story = {
  render: () => <FooterInfoStory />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};
