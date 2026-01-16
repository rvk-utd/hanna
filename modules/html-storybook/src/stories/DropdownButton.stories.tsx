import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

type ControlProps = {};

const meta: Meta<ControlProps> = {
  title: 'DropdownButton',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

export const _DropdownButton: StoryObj<ControlProps> = {
  render: () => (
    <p>
      <strong>This component has been deprecated and renamed to `ContextMenu`</strong>
    </p>
  ),
  argTypes: {},
  args: {},
};
