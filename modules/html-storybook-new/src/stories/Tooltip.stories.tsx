import React from 'react';
import Tooltip from '@reykjavik/hanna-react/Tooltip';
import { Meta, StoryObj } from '@storybook/react';

// TODO: Use an alias for visual-tests
import { loremRT } from '../../../visual-tests/src/test-helpers/dummyData.js';
import { StoryParameters } from '../utils/storytypes.js';

type ControlProps = {
  iconOnly: boolean;
};

type Story = StoryObj<ControlProps>;

const meta: Meta<ControlProps> = {
  title: 'Tooltip',
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  } as StoryParameters,
};
export default meta;

export const _Tooltip: Story = {
  render: (args: ControlProps) => (
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
