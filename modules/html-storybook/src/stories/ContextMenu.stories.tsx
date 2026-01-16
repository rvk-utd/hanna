import React from 'react';
import { ContextMenu, ContextMenuProps } from '@reykjavik/hanna-react/ContextMenu';
import { Meta, StoryObj } from '@storybook/react';

// TODO: Use an alias for visual-tests

type ControlProps = {
  togglerType: NonNullable<ContextMenuProps['togglerType']> | 'custom';
  smallToggler: boolean;
};

const meta: Meta<ControlProps> = {
  title: 'ContextMenu',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const mockItems: ContextMenuProps['items'] = [
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

export const _ContextMenu: StoryObj<ControlProps> = {
  render: (args) =>
    args.togglerType === 'custom' ? (
      <ContextMenu
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
      <ContextMenu
        label="Toggler label"
        labelLong="Optional longer toggler label"
        togglerType={args.togglerType}
        togglerSize={args.smallToggler ? 'small' : undefined}
        items={mockItems}
      />
    ),

  argTypes: {
    togglerType: {
      name: 'Toggler type',
      options: ['secondary', 'primary', 'custom'],
      control: 'inline-radio',
    },
    smallToggler: {
      name: 'Small toggler',
      if: { arg: 'buttonType', neq: 'custom' },
    },
  },
  args: {
    togglerType: 'secondary',
    smallToggler: false,
  },
};
