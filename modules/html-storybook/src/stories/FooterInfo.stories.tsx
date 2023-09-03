import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { FooterInfoStory } from './Shared/FooterInfo.js';

const meta: Meta = {
  title: 'Layout/FooterInfo',
};
export default meta;

export const _FooterInfo: StoryObj = {
  render: () => <FooterInfoStory />,
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: { pos: 'footer' },
  },
};
