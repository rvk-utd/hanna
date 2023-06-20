import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { FooterBadgesStory } from './Shared/FooterBadges.js';

const meta: Meta = {
  title: 'Layout/FooterBadges',
};
export default meta;

type Story = StoryObj;

export const _FooterBadges: Story = {
  render: () => <FooterBadgesStory />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};
