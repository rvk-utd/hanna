import React from 'react';
import { MiniMetrics } from '@reykjavik/hanna-react/MiniMetrics';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MiniMetrics> = {
  title: 'MiniMetrics',
  component: MiniMetrics,
};
export default meta;

type Story = StoryObj<typeof MiniMetrics>;

export const _MiniMetrics: Story = {
  render: () => (
    <MiniMetrics
      text="78% nemanda upplifðu gleði 2019"
      moreButton={{ href: '', label: 'Skoða mælaborðið' }}
      startSeen
    />
  ),
};
