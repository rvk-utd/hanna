import React from 'react';
import { FooterInfo } from '@reykjavik/hanna-react/FooterInfo';
import { Meta, StoryObj } from '@storybook/react';

import { footerInfoData } from './shared/footerInfo.data.js';

const meta: Meta = {
  title: 'Layout/FooterInfo',
};
export default meta;

export const _FooterInfo: StoryObj = {
  render: () => <FooterInfo {...footerInfoData} />,
  parameters: {
    controls: { hideNoControlsWarning: true },
    layout: { pos: 'footer' },
  },
};
