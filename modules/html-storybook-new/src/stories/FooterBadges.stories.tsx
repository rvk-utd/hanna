import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { FooterBadgesStory } from './Shared/FooterBadges.js';

const meta: Meta = {
  title: 'Layout/FooterBadges',
};
export default meta;

export const _FooterBadges: StoryObj = {
  render: () => <FooterBadgesStory />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};
