import React, { ChangeEvent, useState } from 'react';
import { SiteSearchInput } from '@reykjavik/hanna-react/SiteSearchInput';
import { Meta, StoryObj } from '@storybook/react';

import { getFormFieldKnobsNew } from '../utils/knobs.js';

// TODO: Control props do not work (and not in Prod either)

const requiredOptions = ['no', 'yes', 'subtle'] as const;
type Required = (typeof requiredOptions)[number];

type ControlProps = {
  disabled: boolean;
  required: Required;
  invalid: boolean;
  errorMessage: boolean;
  helpText: boolean;
};

type Story = StoryObj<ControlProps>;

const meta: Meta<ControlProps> = {
  title: 'Forms/SiteSearchInput',
};
export default meta;

const SiteSearchInputStory = (args: ControlProps) => {
  const { disabled, required, invalid, errorMessage, helpText } = args;
  const ffProps = getFormFieldKnobsNew({
    disabled,
    required,
    invalid,
    errorMessage,
    helpText,
  });
  const [value, setValue] = useState('');

  return (
    <>
      <SiteSearchInput
        {...ffProps}
        label="Sláðu inn leitarorð"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setValue(e.currentTarget.value);
        }}
        onButtonClick={() => alert('Perform Search!')}
        buttonText="Leita"
      />
      ...
    </>
  );
};

export const _SiteSearchInput: Story = {
  render: (args: ControlProps) => SiteSearchInputStory(args),
  argTypes: {
    disabled: {
      control: 'boolean',
      name: 'Disabled',
    },
    required: {
      control: {
        type: 'inline-radio',
        labels: {
          no: 'No',
          yes: 'Yes',
          subtle: 'Yes but subtle',
        },
      },
      options: requiredOptions,
      name: 'Required',
    },
    invalid: {
      control: 'boolean',
      name: 'Invalid',
    },
    errorMessage: {
      control: 'boolean',
      name: 'Error message',
    },
    helpText: {
      control: 'boolean',
      name: 'Error message',
    },
  },
  args: {
    disabled: false,
    required: 'no',
    invalid: false,
    errorMessage: false,
    helpText: false,
  },
};
