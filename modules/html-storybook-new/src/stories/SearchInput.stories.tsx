import React, { ChangeEvent, useState } from 'react';
import { SearchInput } from '@reykjavik/hanna-react/SearchInput';
import { Meta, StoryObj } from '@storybook/react';

import { getFormFieldKnobsNew } from '../utils/knobs.js';
import { StoryParameters } from '../utils/storytypes.js';

const requiredOptions = ['no', 'yes', 'subtle'] as const;
type Required = (typeof requiredOptions)[number];

type ControlProps = {
  physicalSearchButton: boolean;
  small: boolean;
  disabled: boolean;
  readOnly: boolean;
  required: Required;
  invalid: boolean;
  errorMessage: boolean;
  helpText: boolean;
};

type Story = StoryObj<ControlProps>;

const meta: Meta<ControlProps> = {
  title: 'Forms/SearchInput',
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  } as StoryParameters,
};
export default meta;

const SearchInputStory: React.FC<ControlProps> = ({
  physicalSearchButton,
  small,
  disabled,
  readOnly,
  required,
  invalid,
  errorMessage,
  helpText,
}) => {
  const button = physicalSearchButton || undefined;
  const ffProps = getFormFieldKnobsNew({
    small,
    disabled,
    readOnly,
    required,
    invalid,
    errorMessage,
    helpText,
  });

  const [value, setValue] = useState('');
  return (
    <SearchInput
      {...ffProps}
      label="Search for things"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
      }}
      onButtonClick={button && (() => alert('Perform Search!'))}
    />
  );
};

export const _SearchInput: Story = {
  render: (args: ControlProps) => <SearchInputStory {...args} />,
  argTypes: {
    physicalSearchButton: {
      control: 'boolean',
      name: 'Physical search <button/>',
    },
    small: {
      control: 'boolean',
      name: 'Small',
    },
    disabled: {
      control: 'boolean',
      name: 'Disabled',
    },
    readOnly: {
      control: 'boolean',
      name: 'Read-only',
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
      name: 'Help text',
    },
  },
  args: {
    physicalSearchButton: false,
    small: false,
    disabled: false,
    readOnly: false,
    required: 'no',
    invalid: false,
    errorMessage: false,
    helpText: false,
  },
};
