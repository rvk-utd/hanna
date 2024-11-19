import React from 'react';
import {
  DropdownButton,
  DropdownButtonProps,
} from '@reykjavik/hanna-react/DropdownButton';
import { Meta, StoryObj } from '@storybook/react';

// TODO: Use an alias for visual-tests

type ControlProps = {
  buttonType: NonNullable<DropdownButtonProps['buttonType']>;
  smallButton: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'DropdownButton',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const mockItems: DropdownButtonProps['items'] = [
  {
    label: 'Edit with onClick',
    icon: 'edit',
    onClick: () => alert('Edit'),
  },
  {
    label: (
      <>
        Something else with <small>some JSX</small> and a long label
      </>
    ),
    href: '',
  },
  {
    label: 'Some stuff',
    icon: 'document',
    href: '',
  },
  {
    label: 'Delete',
    href: '',
  },
];

export const _DropdownButton: StoryObj<ControlProps> = {
  render: (args) => (
    <DropdownButton
      label="Toggler text"
      labelLong="Optional longer toggler label"
      items={mockItems}
      buttonType={args.buttonType}
      buttonSize={args.smallButton ? 'small' : undefined}
    />
  ),

  argTypes: {
    buttonType: {
      name: 'Button type',
      options: ['secondary', 'primary'],
      control: 'inline-radio',
    },
    smallButton: {
      name: 'Small button',
    },
  },
  args: {
    buttonType: 'secondary',
    smallButton: false,
  },
};
