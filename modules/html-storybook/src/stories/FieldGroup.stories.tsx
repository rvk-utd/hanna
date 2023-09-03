import React from 'react';
import { FieldGroup } from '@reykjavik/hanna-react/FieldGroup';
import { Meta, StoryObj } from '@storybook/react';

type ControlProps = Record<'smallLegend' | 'disabled', boolean>;

const meta: Meta<ControlProps> = {
  title: 'Forms/FieldGroup',
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  },
};
export default meta;

const FieldGroupStory: React.FC<ControlProps> = ({ smallLegend, disabled }) => {
  return (
    <FieldGroup legend="Group headline" small={smallLegend} disabled={disabled}>
      <p>...FormFields and other content goes here...</p>
    </FieldGroup>
  );
};

export const _FieldGroup: StoryObj<ControlProps> = {
  render: (args) => <FieldGroupStory {...args} />,
  argTypes: {
    smallLegend: { name: 'Small legend' },
    disabled: { name: 'Disabled' },
  },
  args: {
    smallLegend: false,
    disabled: false,
  },
};
