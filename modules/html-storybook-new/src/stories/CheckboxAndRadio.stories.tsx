import React from 'react';
import { Checkbox } from '@reykjavik/hanna-react/Checkbox';
import { boolean } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'components/Forms/Checkbox & Radio',
};
export default meta;

type Story = StoryObj;

const CheckBoxComponent = () => {
  const required = boolean('Required', false);
  const invalid = boolean('Invalid', false);
  const errorMessage = boolean('Error message', false)
    ? 'You must accept this nice offer.'
    : undefined;
  const disabled = boolean('Disabled', false);
  return (
    <Checkbox
      label="Add me to your professional network on LinkedIn"
      required={required}
      invalid={invalid}
      disabled={disabled}
      errorMessage={errorMessage}
    />
  );
};

export const _CheckBox: Story = {
  render: () => <CheckBoxComponent />,
};
