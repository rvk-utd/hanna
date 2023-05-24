import React from 'react';
import FooterInfo from '@reykjavik/hanna-react/FooterInfo';
import { Meta, StoryObj } from '@storybook/react';

import { FooterInfoComponent } from '../Shared/FooterInfo.js';

const meta: Meta<typeof FooterInfo> = {
  title: 'Layout/FooterInfo',
  component: FooterInfo,
};
export default meta;

type Story = StoryObj<typeof FooterInfo>;

export const _FooterInfo: Story = {
  render: () => <FooterInfoComponent />,
};
