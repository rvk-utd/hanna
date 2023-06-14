import React from 'react';
import CheckboxButton from '@reykjavik/hanna-react/CheckboxButton';
import { CheckboxButtonsGroup } from '@reykjavik/hanna-react/CheckboxButtonsGroup';
import { RadioButtonsGroup } from '@reykjavik/hanna-react/RadioButtonsGroup';
import { Meta, StoryObj } from '@storybook/react';

import { StoryParameters } from '../utils/storytypes.js';

type CheckboxButtonControlProps = Record<
  'subText' | 'required' | 'invalid' | 'errorMessage' | 'disabled',
  boolean
>;

type CheckboxButtonStory = StoryObj<CheckboxButtonControlProps>;

const meta: Meta = {
  title: 'Forms/Checkbox & Radio Buttons',
  parameters: {
    controls: { hideNoControlsWarning: true },
    viewport: {
      defaultViewport: 'responsive',
    },
  } as StoryParameters,
};
export default meta;

// ==================== CheckboxButton ===========================================

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

export const _CheckboxButton: CheckboxButtonStory = {
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
      name: 'Disabled',
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

const disabledOptions = ['none', 'some', 'all'] as const;
type Disabled = (typeof disabledOptions)[number];

type CheckboxAndRadioButtonsGroupControlProps = Omit<
  CheckboxButtonControlProps,
  'disabled'
> & {
  disabled: Disabled;
};

type CheckboxAndRadioButtonsGroupStory =
  StoryObj<CheckboxAndRadioButtonsGroupControlProps>;

type CheckboxAndRadioButtonsGroupArgs = Omit<
  CheckboxAndRadioButtonsGroupControlProps,
  'subText'
>;

const checkboxAndRadioButtonsGroupArgTypes = {
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
    control: {
      type: 'inline-radio',
      labels: {
        none: 'None',
        some: 'Some',
        all: 'All',
      },
    },
    options: disabledOptions,
    name: 'Disabled',
  },
};

const checkboxAndRadioButtonsGroupArgs: CheckboxAndRadioButtonsGroupArgs = {
  required: false,
  invalid: false,
  errorMessage: false,
  disabled: 'none',
};

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

const getProps = (args: CheckboxAndRadioButtonsGroupControlProps) => {
  const { required, invalid, errorMessage, disabled } = args;
  const _errorMessage = errorMessage ? 'You must accept this nice offer.' : undefined;
  const disabledOpt = disabled !== 'none' ? disabled : '';
  const _disabled = disabledOpt === 'some' ? false : !!disabledOpt;
  const options = disabledOpt === 'some' ? partialNames : names;

  return {
    invalid,
    _errorMessage,
    options,
    required,
    _disabled,
  };
};

// ==================== Checkbox Buttons Group =======================================

export const _CheckboxButtonsGroup: CheckboxAndRadioButtonsGroupStory = {
  render: (args: CheckboxAndRadioButtonsGroupControlProps) => (
    <CheckboxButtonsGroup
      label="Pick your fruits"
      name="fruits"
      value={['Anna', 'Guðrún']}
      {...getProps(args)}
    />
  ),
  argTypes: {
    ...checkboxAndRadioButtonsGroupArgTypes,
  },
  args: {
    required: false,
    invalid: false,
    errorMessage: false,
    disabled: 'none',
  },
};

// ==================== Radio Buttons Group =======================================

export const _RadioButtonsGroup: CheckboxAndRadioButtonsGroupStory = {
  render: (args: CheckboxAndRadioButtonsGroupControlProps) => (
    <RadioButtonsGroup
      label="Pick your fruit"
      name="fruit"
      value="Anna"
      {...getProps(args)}
    />
  ),
  argTypes: { ...checkboxAndRadioButtonsGroupArgTypes },
  args: { ...checkboxAndRadioButtonsGroupArgs },
};
