import React from 'react';
import { FooterBadges } from '@reykjavik/hanna-react/FooterBadges';
import { Meta, StoryObj } from '@storybook/react';

import { footerBadgesData } from './shared/footerBadges.data.js';

const meta: Meta = {
  title: 'Layout/FooterBadges',
};
export default meta;

export const _FooterBadges: StoryObj = {
  render: () => <FooterBadges {...footerBadgesData} />,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};
