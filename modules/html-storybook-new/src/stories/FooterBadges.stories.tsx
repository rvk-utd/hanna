import React from 'react';
import { FooterBadges } from '@reykjavik/hanna-react/FooterBadges';
import { Meta, StoryObj } from '@storybook/react';

import { FooterBadgesStory } from '../Shared/FooterBadges.js';

const meta: Meta<typeof FooterBadges> = {
  title: 'Layout/FooterBadges',
  component: FooterBadges,
};
export default meta;

type Story = StoryObj<typeof FooterBadges>;

export const _FooterBadges: Story = {
  render: () => <FooterBadgesStory />,
};
