import React from 'react';
import Tooltip from '@reykjavik/hanna-react/Tooltip';
import { Meta, StoryObj } from '@storybook/react';

// TODO: Use an alias for visual-tests
import { loremRT } from '../../../visual-tests/src/test-helpers/dummyData.js';

type TooltipControlProps = {
  iconOnly: boolean;
};

type Story = StoryObj<TooltipControlProps>;

const meta: Meta<TooltipControlProps> = {
  title: 'Tooltip',
};
export default meta;

export const _Tooltip: Story = {
  render: (args: TooltipControlProps) => (
    <Tooltip label="Hover me" text={loremRT.short(true)} iconOnly={args.iconOnly} />
  ),
  argTypes: {
    iconOnly: {
      control: 'boolean',
      name: 'Icon only',
    },
  },
  args: {
    iconOnly: false,
  },
};
