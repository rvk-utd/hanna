import React from 'react';
import { FieldGroup } from '@reykjavik/hanna-react/FieldGroup';
import { boolean } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FieldGroup> = {
  title: 'Forms/FieldGroup',
  component: FieldGroup,
};
export default meta;

type Story = StoryObj<typeof FieldGroup>;

const FieldGroupStory = () => {
  const small = boolean('Small Legend', false);
  const disabled = boolean('Disabled', false);
  return (
    <FieldGroup legend="Group headline" small={small} disabled={disabled}>
      <p>...FormFields and other content goes here...</p>
    </FieldGroup>
  );
};

export const _FieldGroup: Story = {
  render: () => <FieldGroupStory />,
};
