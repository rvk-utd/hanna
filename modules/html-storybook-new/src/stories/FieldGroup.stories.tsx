import React from 'react';
import { FieldGroup } from '@reykjavik/hanna-react/FieldGroup';
import { Meta, StoryObj } from '@storybook/react';

type FieldGroupControlProps = Record<'smallLegend' | 'disabled', boolean>;

type Story = StoryObj<FieldGroupControlProps>;

const meta: Meta<FieldGroupControlProps> = {
  title: 'Forms/FieldGroup',
};
export default meta;

const FieldGroupStory: React.FC<FieldGroupControlProps> = ({ smallLegend, disabled }) => {
  return (
    <FieldGroup legend="Group headline" small={smallLegend} disabled={disabled}>
      <p>...FormFields and other content goes here...</p>
    </FieldGroup>
  );
};

export const _FieldGroup: Story = {
  render: (args: FieldGroupControlProps) => <FieldGroupStory {...args} />,
  argTypes: {
    smallLegend: {
      control: 'boolean',
      name: 'Small legend',
    },
    disabled: {
      control: 'boolean',
      name: 'Disabled',
    },
  },
  args: {
    smallLegend: false,
    disabled: false,
  },
};
