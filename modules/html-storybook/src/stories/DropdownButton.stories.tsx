import React from 'react';
import {
  DropdownButton,
  DropdownButtonProps,
} from '@reykjavik/hanna-react/DropdownButton';
import { Meta, StoryObj } from '@storybook/react';

// TODO: Use an alias for visual-tests

type ControlProps = {
  buttonType: NonNullable<DropdownButtonProps['buttonType']> | 'custom';
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
    current: true,
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
  render: (args) =>
    args.buttonType === 'custom' ? (
      <DropdownButton
        Toggler={({ isOpen }) => (
          <span
            style={{ display: 'block', background: 'yellow', padding: '8px' }}
            aria-label="Longer text for toggler"
          >
            Custom toggler {isOpen ? '▲' : '▼'}
          </span>
        )}
        items={mockItems}
      />
    ) : (
      <DropdownButton
        label="Toggler label"
        labelLong="Optional longer toggler label"
        buttonType={args.buttonType}
        buttonSize={args.smallButton ? 'small' : undefined}
        items={mockItems}
      />
    ),

  argTypes: {
    buttonType: {
      name: 'Button type',
      options: ['secondary', 'primary', 'custom'],
      control: 'inline-radio',
    },
    smallButton: {
      name: 'Small button',
      if: { arg: 'buttonType', neq: 'custom' },
    },
  },
  args: {
    buttonType: 'secondary',
    smallButton: false,
  },
};
