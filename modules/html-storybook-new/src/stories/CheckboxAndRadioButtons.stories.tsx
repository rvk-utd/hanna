import React from 'react';
import CheckboxButton from '@reykjavik/hanna-react/CheckboxButton';
import { CheckboxButtonsGroup } from '@reykjavik/hanna-react/CheckboxButtonsGroup';
import { RadioButtonsGroup } from '@reykjavik/hanna-react/RadioButtonsGroup';
import { boolean, optionsKnob } from '@storybook/addon-knobs';
import { Meta, StoryObj } from '@storybook/react';

type CheckboxButtonControlProps = Record<
  'subText' | 'required' | 'invalid' | 'errorMessage' | 'disabled',
  boolean
>;

type Story = StoryObj<CheckboxButtonControlProps>;

const meta: Meta = {
  title: 'Forms/Checkbox & Radio Buttons',
};
export default meta;

const CheckboxButtonStory: React.FC<CheckboxButtonControlProps> = ({
  subText,
  required,
  invalid,
  errorMessage,
  disabled,
}) => {
  const _errorMessage = errorMessage ? 'You must accept this nice offer.' : undefined;

  const labelText = 'Add me to your professional network on LinkedIn';
  const label = subText ? (
    <>
      {labelText} <small>(Just kidding)</small>
    </>
  ) : (
    labelText
  );

  return (
    <CheckboxButton
      label={label}
      required={required}
      invalid={invalid}
      disabled={disabled}
      errorMessage={_errorMessage}
    />
  );
};

export const _CheckboxButton: Story = {
  render: (args: CheckboxButtonControlProps) => <CheckboxButtonStory {...args} />,
  name: 'CheckboxButton',
  argTypes: {
    subText: {
      control: 'boolean',
      name: 'Sub-text (small print)',
    },
    required: {
      control: 'boolean',
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
    disabled: {
      control: 'boolean',
      name: 'Error message',
    },
  },
  args: {
    subText: true,
    required: false,
    invalid: false,
    errorMessage: false,
    disabled: false,
  },
};

// ---------------------------------------------------------------------------

const names = [
  {
    value: 'Jón',
    label: (
      <>
        Jón Jónsson <small>Fæddur 1991</small>
      </>
    ),
  },
  {
    value: 'Anna',
    label: <>Anna Önnudóttir</>,
  },
  {
    value: 'Gunnar',
    label: (
      <>
        Gunnar Gunnarilíus Gunnarsson <small>Fæddur 1995</small>
      </>
    ),
  },
  {
    value: 'Guðrún',
    label: (
      <>
        Guðrún Guðrúnardóttir <small>Fædd 1997</small>
      </>
    ),
  },
  {
    value: 'Pétur',
    label: <>Pétur Pétursson</>,
  },
];
const partialNames = names.map((opt, i) => ({
  ...opt,
  disabled: i >= 2,
}));

const getProps = () => {
  const required = boolean('Required', false);
  const invalid = boolean('Invalid', false);
  const errorMessage = boolean('Error message', false)
    ? 'You must accept this nice offer.'
    : undefined;
  const disabledOpt = optionsKnob(
    'Disabled',
    {
      None: '',
      Some: 'some',
      All: 'all',
    },
    '',
    {
      display: 'inline-radio',
    }
  );

  const disabled = disabledOpt === 'some' ? false : !!disabledOpt;

  const options = disabledOpt === 'some' ? partialNames : names;

  return {
    invalid,
    errorMessage,
    options,
    required,
    disabled,
  };
};

export const _CheckboxButtonsGroup: Story = {
  render: () => (
    <CheckboxButtonsGroup
      label="Pick your fruits"
      name="fruits"
      value={['Anna', 'Guðrún']}
      {...getProps()}
    />
  ),
};

// ---------------------------------------------------------------------------

export const _RadioButtonsGroup: Story = {
  render: () => (
    <RadioButtonsGroup
      label="Pick your fruit"
      name="fruit"
      value="Anna"
      {...getProps()}
    />
  ),
};
